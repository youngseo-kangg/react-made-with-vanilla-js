import { React } from "src/const/react";

let rootComponentFn: (() => IReactNode) | null = null; // 🔥 Root Component 저장용
const currentContainer: HTMLElement | null = null;
/**
 * 가상 DOM을 실제 DOM으로 변환하여 지정된 컨테이너에 렌더링하는 함수
 *
 * @param {IReactNode | string} node - 렌더링할 가상 DOM 노드 또는 문자열
 * @param {HTMLElement} container - 렌더링 대상이 되는 실제 DOM 요소
 */
const render = (node: IReactNode | string, container: HTMLElement) => {
  if (rootComponentFn === null) {
    rootComponentFn = typeof node === "function" ? node : null; // 🔥 컴포넌트 함수 저장
  }

  if (typeof node === "string" || typeof node === "number") {
    // 0-1. node가 문자열 or 숫자라면 `TextNode`를 생성하여 `container`에 추가한다
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

const createRoot = (node: () => IReactNode, container: HTMLElement) => {
  rootComponentFn = node; // 🔥 최상위 컴포넌트 함수 저장
  render(node(), container);
};

// !! 작동 X -> 새로운 state 반영 안됨 / diffing, reconciliation 로직 구현 필요
const rerender = () => {
  if (!rootComponentFn) return;

  console.log("🔄 리렌더링 시작");

  // 1️⃣ 새로운 state가 반영된 가상 DOM 생성
  // ? 새로운 state를 반영하려면...>???
  let domObj: IReactNode | string = rootComponentFn();
  console.log("📌 prevDomObj:", domObj);

  // 2️⃣ newContainer를 만들기 위한 html태그 찾기
  // 최종적으로 HTML 태그(`string`)가 나올 때까지 `name`을 재귀적으로 탐색
  while (typeof domObj === "object" && typeof domObj.name === "function") {
    domObj = domObj.name(domObj.props);
    console.log("📌 name 탐색 중:", domObj);
  }

  // 3️⃣ 최종 `name`이 문자열인지 확인
  if (typeof domObj !== "object" || typeof domObj.name !== "string") {
    console.warn("🚨 유효한 HTML 태그가 아닙니다. 렌더링을 중단합니다.");
    return;
  }

  const tagName = domObj.name as string;

  // 4️⃣ HTML 태그 검증 → 커스텀 컴포넌트인지, 실제 태그인지 구분
  const testElement = document.createElement(tagName);
  if (testElement.toString() === "[object HTMLUnknownElement]") {
    console.warn(`🚨 "${tagName}"는 유효한 HTML 태그가 아닙니다. 렌더링을 중단합니다.`);
    return;
  }

  // 5️⃣ 새로운 container 요소 만들기
  const newContainer = document.createElement(tagName);
  console.log("📌 최종 HTML 요소:", newContainer);

  // 6️⃣ 새로운 가상 DOM을 렌더링
  render(domObj, newContainer);
};

export { createRoot, render, rerender };
