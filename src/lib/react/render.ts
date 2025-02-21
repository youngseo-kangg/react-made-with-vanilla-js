import { shallowEqual } from "@util";
import { createDOMElement, updateDomElement } from "@react/handleDOMElement";

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
  let currentVNode: IReactNode | null; // dom 저장용
  let currentStateIndex = 0; // useState가 여러 개일 때 각 state를 구분하는 인덱스
  const stateStore: unknown[] = []; // 여러 useState 호출을 위한 상태 저장 배열
  let depsIndex = 0;
  let prevDepsIndex = 0;
  const dependencies: (unknown[] | undefined)[] = [];
  const effectList: (() => void)[] = [];
  const cleanupList: Map<number, () => void> = new Map(); // cleanup 함수 저장 배열

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
      const newVNode = typeof node === "function" ? node({ children: [] }) : node;
      // console.log(newVNode);

      if (!currentVNode) {
        // 최초 렌더링 시
        const element = createDOMElement(newVNode);
        if (element) container.appendChild(element);
      } else {
        // 기존 VDOM과 비교하여 변경된 부분만 업데이트
        updateDomElement(container, currentVNode, newVNode, container.firstChild);
      }

      currentVNode = newVNode; // 현재 Virtual DOM 저장
      effectList.forEach((effect) => effect()); // useEffect의 콜백 실행
    } catch (error) {
      console.log(error);
      throw new Error("Error in render ---> !!!");
    }
  };

  const useEffect = (callback: () => void | (() => void), deps?: unknown[]) => {
    const index = depsIndex; // 현재 useEffect 호출의 고유한 인덱스
    // console.log("index ---> ", index);

    const oldDependencies = dependencies[index];
    const hasChanged =
      !oldDependencies ||
      !deps ||
      deps.some((val, idx) => !shallowEqual(val, oldDependencies[idx])); // 이전과 deps가 변경되었는지 확인

    if (hasChanged) {
      // 🔹 1. 이전 cleanup 실행
      cleanupList.get(prevDepsIndex)?.();
      cleanupList.delete(prevDepsIndex); // 실행 후 삭제

      // 🔹 2. 새로운 deps 저장
      dependencies[index] = deps;

      // 🔹 3. callback 실행 및 cleanup 저장
      const cleanup = callback();
      if (typeof cleanup === "function") {
        cleanupList.set(index, cleanup);
      }
      // console.log("cleanupList after ---> ", cleanupList);
      prevDepsIndex = index;
    }

    depsIndex++;
  };

  const useState = <T>(initialState: T): [T, setState<T>] => {
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
        // console.log(`${currentIndex}th state updated to ---> `, nextState);

        if (currentContainer && currentComponent) {
          render(currentComponent, currentContainer);
        }
      }
    };

    currentStateIndex++; // 다음 useState 호출을 위해 인덱스 증가
    return [stateStore[currentIndex] as T, setState];
  };

  return { render, useState, useEffect };
};

export const { useState, render, useEffect } = renderer();
