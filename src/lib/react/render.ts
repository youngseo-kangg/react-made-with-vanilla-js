import { React } from "src/const/react";

let currentContainer: HTMLElement;
/**
 * 가상 DOM을 실제 DOM으로 변환하여 지정된 컨테이너에 렌더링하는 함수
 *
 * @param {IReactNode | string} node - 렌더링할 가상 DOM 노드 또는 문자열
 * @param {HTMLElement} container - 렌더링 대상이 되는 실제 DOM 요소
 */
const render = (node: IReactNode | string, container: HTMLElement) => {
  currentContainer = container;

  // 0-1. node가 문자열 or 숫자라면 `TextNode`를 생성하여 `container`에 추가한다
  if (typeof node === "string" || typeof node === "number") {
    container.appendChild(document.createTextNode(String(node)));

    return;
  }

  const { name, props, children } = node;

  // 0-2. node가 함수형 컴포넌트(커스텀 컴포넌트)라면 해당 함수를 실행하고, 결과를 다시 `render` 함수로 렌더링한다.
  if (typeof name === "function") {
    const componentNode = name(props || {});
    render(componentNode, container);

    return;
  }

  // 0-3. Fragment인 경우, 추가적인 DOM 요소 없이 자식만 렌더링
  if (name === React.Fragment) {
    if (children) {
      children.forEach((child) => render(child, container));
    }
    return;
  }

  // 이 부분에 들어오는 node인 경우는 일반 HTML요소
  // 1. html 컴포넌트 생성
  const element = document.createElement(name);

  // 2. 일반 HTML 요소라면 해당 요소를 생성하고 속성을 설정한 뒤 `container`에 추가한다.
  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      if (key.startsWith("on") && typeof value === "function") {
        // 2-1. 이벤트 리스너 속성 처리 (prefix 'on'제거 후 addEventListener)
        const modifiedEventName = key.slice(2).toLowerCase();

        element.addEventListener(modifiedEventName, value as EventListener);
      } else {
        // 2-2. 이벤트 리스너 이외 속성 처리
        element.setAttribute(key, String(value));
      }
    });
  }

  // 3. 자식 요소가 있으면 재귀적으로 `render` 함수를 호출하여 모든 자식을 렌더링한다.
  if (children) {
    (Array.isArray(children) ? children : [children]).forEach((child) => render(child, element));
  }

  // 4. container에 element 붙여주기
  container.appendChild(element);
};

const rerender = () => {
  currentContainer.innerHTML = ""; // 리셋
  render("new node needed", currentContainer); // 새로운 children이 만들어져야 하는데 ...
};

export { render, rerender };
