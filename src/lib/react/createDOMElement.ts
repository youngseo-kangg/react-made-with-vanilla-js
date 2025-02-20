import { isIReactNode } from "@util";
import { SyntheticEvent } from "@react/syntheticEvent";

const EventStore: Map<EventTarget, any> = new Map();

/**
 * 이벤트를 처리하고 SyntheticEvent로 감싸서 핸들러에 전달하는 함수.
 *
 * 1. 원본 `Event`를 `SyntheticEvent`로 래핑하여 핸들러에 전달한다.
 *  - 바로 {...e, isPropagationStopped: false} 로는 X
 * 2. 이벤트 대상(`e.target`)에서 시작하여 부모 요소로 버블링하며 핸들러를 실행한다.
 * 3. `syntheticEvent.stopPropagation()`이 호출되면 버블링을 중단한다.
 *
 * @param {Event} e - 브라우저의 원본 이벤트 객체
 */
const handleEvent = (e: Event) => {
  const syntheticEvent = new SyntheticEvent(e);
  let currentEventTarget = e.target; // 이벤트 발생 요소 ... <button>try clicking this!</button>

  while (currentEventTarget) {
    const eventHandlers = EventStore.get(currentEventTarget);
    if (eventHandlers && eventHandlers[e.type]) {
      // 해당 요소의 이벤트 핸들러 실행
      eventHandlers[e.type](syntheticEvent);

      // stopPropagation()이 호출되면 이벤트 전파 중단
      if (!syntheticEvent.isPropagationStopped) break;
    }
    // 부모 요소로 이동 (버블링)
    currentEventTarget = (currentEventTarget as HTMLElement).parentElement;
  }
};

export const createDOMElement = (node: VirtualNode) => {
  // 1. node가 null, undefined, boolean 이라면 ""(empty string) 리턴(= 렌더링 x)
  if (node === null || node === undefined || typeof node === "boolean") {
    return document.createTextNode("");
  }

  // 2. node가 string이라면 `TextNode` 리턴
  if (typeof node === "string" || typeof node === "number") {
    return document.createTextNode(String(node));
  }

  // 3. node가 array값인 경우
  if (Array.isArray(node)) {
    const fragment = document.createDocumentFragment();

    node.forEach((n) => fragment.appendChild(createDOMElement(n)));

    return fragment;
  }

  // 4. node가 IReactNode 타입이라면
  if (isIReactNode(node)) {
    const { name, props, children } = node;

    // 4-1. html 컴포넌트 생성
    const element = document.createElement(name);

    // 4-2. 일반 HTML 요소라면 해당 요소를 생성하고 속성을 설정한 뒤 `container`에 추가한다.
    if (props) {
      Object.entries(props).forEach(([key, value]) => {
        if (key.startsWith("on") && typeof value === "function") {
          // a) 이벤트 리스너 속성 처리 (prefix 'on'제거 후 addEventListener)
          const modifiedEventName = key.slice(2).toLowerCase();

          if (!EventStore.has(element)) EventStore.set(element, {});
          EventStore.get(element)[modifiedEventName] = value;
          element.addEventListener(modifiedEventName, handleEvent /* value as EventListener */);
        } else if (key === "style" && typeof value === "object") {
          // b) inline style 처리
          Object.entries(value as Record<string, string>).forEach(([cssKey, cssValue]) => {
            element.style[cssKey as any] = cssValue;
          });
        } else if (key === "className") {
          // c) className 처리
          element.setAttribute("class", String(value));
        } else {
          // d) 이외 처리
          element.setAttribute(key, String(value));
        }
      });
    }

    // 4-3. 자식 요소가 있으면 재귀적으로 `render` 함수를 호출하여 모든 자식을 렌더링 + appendChild 해주기
    if (children) {
      (Array.isArray(children) ? children : [children]).forEach((child) => {
        const childElement = createDOMElement(child);
        element.appendChild(childElement);
      });
    }

    return element;
  }

  throw Error("Error occured in createDOMElement !!!");
};
