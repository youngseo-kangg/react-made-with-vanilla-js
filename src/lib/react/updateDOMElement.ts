import { isIReactNode, isValidNode, shallowEqual } from "@util";
import { createDOMElement } from "./createDOMElement";

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
    const newValue = newProps[key];
    if (newValue !== oldProps[key]) {
      element.setAttribute(key, String(newValue));
    }
  });
};

export const updateDomElement = (
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
  // console.log("----------------- start");
  // console.log("부모 엘리먼트 : ", parent);
  // console.log("oldNode: ", oldNode);
  // console.log("newNode: ", newNode);
  // console.log("현재 타겟 엘리먼트: ", currentElement);
  // console.log("----------------- end");

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
