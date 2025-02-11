import { isIReactNode } from "../util/typeCheck";

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

          element.addEventListener(modifiedEventName, value as EventListener);
        } else {
          // b) 이벤트 리스너 이외 속성 처리
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
