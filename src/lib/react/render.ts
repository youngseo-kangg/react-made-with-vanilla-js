import { shallowEqual } from "../util";
import { createDOMElement } from "./createDOMElement";

declare global {
  namespace JSX {
    /**
     * JSX.Element 타입은 가상 DOM을 나타내는 React 노드를 표현합니다.
     * JSX.Element는 `IReactNode`와 같은 타입을 가지며, 요소, 텍스트, 컴포넌트를 포함할 수 있습니다.
     *
     */
    type Element = IReactNode;

    /**
     * JSX.IntrinsicElements는 HTML 태그 이름에 대한 타입 정의를 제공합니다.
     * 각 HTML 태그의 속성에 대한 타입은 `ElementPropsType`으로 정의됩니다.
     * 이 타입은 기본적으로 `HTMLDivElement`, `HTMLButtonElement` 등과 같은 HTML 요소에 해당하는 속성들을 정의합니다.
     */
    type IntrinsicElements = {
      [elemName in keyof HTMLElementTagNameMap]: ElementPropsType;
    };
  }
}

const renderer = () => {
  let currentComponent: JSX.Element | Component | null;
  let currentContainer: HTMLElement | null;
  let currentStateIndex = 0; // useState가 여러 개일 때 각 state를 구분하는 인덱스
  const stateStore: unknown[] = []; // 여러 useState 호출을 위한 상태 저장 배열

  /**
   * 가상 DOM을 실제 DOM으로 변환하여 지정된 컨테이너에 렌더링하는 함수
   *
   * @param {JSX.Element | Component} node - 렌더링할 가상 DOM 노드 또는 문자열
   * @param {HTMLElement} container - 렌더링 대상이 되는 실제 DOM 요소
   */
  const render = (node: JSX.Element | Component, container: HTMLElement) => {
    if (!currentComponent || !currentContainer) {
      currentComponent = typeof node === "function" ? node : () => node;
      currentContainer = container;
    }

    try {
      currentStateIndex = 0;
      container.innerHTML = "";

      const rawDomElement = typeof node === "function" ? node({ children: [] }) : node;

      const element = createDOMElement(rawDomElement);

      container.appendChild(element);
    } catch (error) {
      console.log(error);
      throw new Error("Error in render ---> !!!");
    }
  };

  const rerender = () => {
    if (currentContainer && currentComponent) {
      render(currentComponent, currentContainer);
    }
  };

  const useState = <T>(initialState: T): [T, (newState: T | ((prevState: T) => T)) => void] => {
    const currentIndex = currentStateIndex; // 현재 useState 호출의 인덱스

    if (stateStore[currentIndex] === undefined) {
      stateStore[currentIndex] = initialState;
    }

    const setState = (newState) => {
      const nextState =
        typeof newState === "function"
          ? (newState as (prev: T) => T)(stateStore[currentIndex] as T)
          : newState;

      if (!shallowEqual(stateStore[currentIndex], nextState)) {
        stateStore[currentIndex] = nextState;
        console.log(`${currentIndex}th state updated to ---> `, nextState);

        rerender(); // 상태 변경이 감지되면 rerender 실행
      }
    };

    currentStateIndex++; // 다음 useState 호출을 위해 인덱스 증가
    return [stateStore[currentIndex] as T, setState];
  };

  return { render, rerender, useState };
};

export const { useState, render, rerender } = renderer();
