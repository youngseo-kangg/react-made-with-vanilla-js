import { isIReactNode, isValidNode, shallowEqual } from "@util";
import { SyntheticEvent } from "@react/syntheticEvent";

const EventStore: Map<EventTarget, any> = new Map();
const handleDOMElement = () => {
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

  const createDOMElement = (node: VirtualNode) => {
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
            let modifiedEventName = key.slice(2).toLowerCase();

            if (modifiedEventName === "change") modifiedEventName = "input";
            if (!EventStore.has(element)) EventStore.set(element, {});

            EventStore.get(element)[modifiedEventName] = value;
            element.addEventListener(modifiedEventName, (e) => handleEvent(e));
            // console.log(EventStore);
          } else if (key === "style" && typeof value === "object") {
            // b) inline style 처리
            Object.entries(value as Record<string, string>).forEach(([cssKey, cssValue]) => {
              element.style[cssKey as any] = cssValue;
            });
          } else if (key === "className") {
            // c) className 처리
            element.setAttribute("class", String(value));
          } else if (key === "checked" || key === "required" || key === "disabled") {
            // d) boolean 값 가져야 하는 경우 처리
            (element as HTMLInputElement)[key] = Boolean(value); // Boolean 변환 후 적용
          } else {
            // e) 이외 처리
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

  /**
   * DOM 요소의 속성을 업데이트하는 함수입니다.
   * @param element 업데이트할 실제 DOM 요소
   * @param oldProps 이전 속성 객체
   * @param newProps 새로운 속성 객체
   */
  const updateProps = (
    element: HTMLElement,
    oldProps: ElementPropsType,
    newProps: ElementPropsType
  ) => {
    oldProps = oldProps || {};
    newProps = newProps || {};

    // 기존 속성 제거
    Object.keys(oldProps).forEach((key) => {
      if (!(key in newProps)) element.removeAttribute(key);
    });

    // 새로운 속성 추가 또는 업데이트
    Object.keys(newProps).forEach((key) => {
      const isBooleanValue = key === "checked" || key === "required" || key === "disabled";

      if (key.startsWith("on")) {
        // a) 이벤트 핸들러 재등록
        let modifiedEventName = key.slice(2).toLowerCase();
        if (modifiedEventName === "change") modifiedEventName = "input";

        // 기존 핸들러 제거 후 새 핸들러 등록
        if (EventStore.has(element)) {
          const eventHandlers = EventStore.get(element);
          if (eventHandlers[modifiedEventName])
            element.removeEventListener(modifiedEventName, eventHandlers[modifiedEventName]);
        } else {
          EventStore.set(element, {});
        }

        // EventStore에 이벤트 새로 등록
        EventStore.get(element)[modifiedEventName] = newProps[key];
        // element에 이벤트 새로 등록
        element.addEventListener(modifiedEventName, (e) => handleEvent(e));
      } else if (isBooleanValue) {
        // b) boolean값을 가지는 경우
        element[key] = Boolean(newProps[key]);
      } else if (!shallowEqual(newProps[key], oldProps[key])) {
        // c) 이외
        element.setAttribute(key, String(newProps[key]));
      }
    });
  };

  const updateDomElement = (
    /**
     * 현재 업데이트할 노드의 부모 DOM 요소 (Real DOM)
     */
    parent: HTMLElement | null,
    /**
     * 이전 가상 DOM 노드 (Virtual DOM)
     */
    oldNode: VirtualNode | null,
    /**
     * 새로운 가상 DOM 노드 (Virtual DOM)
     */
    newNode: VirtualNode | null,
    /**
     * 현재 실제 DOM 노드 (Real DOM)
     */
    currentElement: Node | null
  ) => {
    // 0. 들어오는 부모/현재 타겟인 real dom이 null인 경우 중지
    if (!parent || !currentElement) return;

    // 1. newNode (새로운 Virtual DOM)가 없는 경우 -> 기존 Virtual DOM은 있고, 새로운 Virtual DOM은 없으니 노드 삭제 케이스
    if (!isValidNode(newNode)) {
      return parent.removeChild(currentElement);
    }

    // 2. oldNode (이전 Virtual DOM)가 없는 경우 -> 새로운 노드 추가 케이스
    if (!isValidNode(oldNode)) {
      const newElement = createDOMElement(newNode);
      return parent.appendChild(newElement);
    }

    // 3. 텍스트 / 숫자 노드인 경우 비교 후 변경
    if (typeof oldNode === "string" || typeof oldNode === "number") {
      if (!shallowEqual(oldNode, newNode)) {
        const newElement = createDOMElement(newNode);
        parent.replaceChild(newElement, currentElement);
      }
      return;
    }

    // 4. IReactNode인 경우
    if (isIReactNode(oldNode) && isIReactNode(newNode) && !shallowEqual(oldNode, newNode)) {
      // 4-1. 태그명이 다르면 새 노드로 교체
      if (oldNode.name !== newNode.name) {
        const newElement = createDOMElement(newNode);
        return parent.replaceChild(newElement, currentElement);
      }

      // 4-2. 속성 업데이트
      if (!shallowEqual(oldNode.props, newNode.props) && currentElement instanceof HTMLElement) {
        updateProps(currentElement, oldNode.props, newNode.props);
      }

      // 5. children이 있다면 updateDOMElement 재귀 호출
      if (oldNode.children && newNode.children) {
        const maxLen = Math.max(oldNode.children.length, newNode.children.length);

        for (let i = 0; i < maxLen; i++) {
          updateDomElement(
            currentElement as HTMLElement, // 현재 노드를 기준으로 업데이트 진행
            oldNode.children[i],
            newNode.children[i],
            currentElement!.childNodes[i]
          );
        }
      }
    }
  };

  return { createDOMElement, updateDomElement };
};

export const { createDOMElement, updateDomElement } = handleDOMElement();
// export const createDOMElement = (node: VirtualNode) => {
//   // 1. node가 null, undefined, boolean 이라면 ""(empty string) 리턴(= 렌더링 x)
//   if (node === null || node === undefined || typeof node === "boolean") {
//     return document.createTextNode("");
//   }

//   // 2. node가 string이라면 `TextNode` 리턴
//   if (typeof node === "string" || typeof node === "number") {
//     return document.createTextNode(String(node));
//   }

//   // 3. node가 array값인 경우
//   if (Array.isArray(node)) {
//     const fragment = document.createDocumentFragment();

//     node.forEach((n) => fragment.appendChild(createDOMElement(n)));

//     return fragment;
//   }

//   // 4. node가 IReactNode 타입이라면
//   if (isIReactNode(node)) {
//     const { name, props, children } = node;

//     // 4-1. html 컴포넌트 생성
//     const element = document.createElement(name);

//     // 4-2. 일반 HTML 요소라면 해당 요소를 생성하고 속성을 설정한 뒤 `container`에 추가한다.
//     if (props) {
//       Object.entries(props).forEach(([key, value]) => {
//         if (key.startsWith("on") && typeof value === "function") {
//           // a) 이벤트 리스너 속성 처리 (prefix 'on'제거 후 addEventListener)
//           let modifiedEventName = key.slice(2).toLowerCase();

//           if (modifiedEventName === "change") modifiedEventName = "input";
//           if (!EventStore.has(element)) EventStore.set(element, {});

//           EventStore.get(element)[modifiedEventName] = value;
//           element.addEventListener(modifiedEventName, (e) => handleEvent(e));
//         } else if (key === "style" && typeof value === "object") {
//           // b) inline style 처리
//           Object.entries(value as Record<string, string>).forEach(([cssKey, cssValue]) => {
//             element.style[cssKey as any] = cssValue;
//           });
//         } else if (key === "className") {
//           // c) className 처리
//           element.setAttribute("class", String(value));
//         } else if (key === "checked" || key === "required" || key === "disabled") {
//           // d) boolean 값 가져야 하는 경우 처리
//           (element as HTMLInputElement)[key] = Boolean(value); // Boolean 변환 후 적용
//         } else {
//           // e) 이외 처리
//           element.setAttribute(key, String(value));
//         }
//       });
//     }

//     // 4-3. 자식 요소가 있으면 재귀적으로 `render` 함수를 호출하여 모든 자식을 렌더링 + appendChild 해주기
//     if (children) {
//       (Array.isArray(children) ? children : [children]).forEach((child) => {
//         const childElement = createDOMElement(child);
//         element.appendChild(childElement);
//       });
//     }

//     return element;
//   }

//   throw Error("Error occured in createDOMElement !!!");
// };
