import { React } from "src/const/react";

/**
 * 가상 DOM 요소를 생성하는 함수입니다.
 */
type ICreateElement = (
  type: ElementType,
  props: ElementPropsType,
  ...children: ChildrenType
) => IReactNode;

const createElement: ICreateElement = (
  /**
   * 요소의 타입 (함수형 컴포넌트 또는 HTML 태그)
   */
  type,
  /**
   * 요소에 전달된 속성(프로퍼티)
   */
  props: ElementPropsType,
  /**
   * 요소의 자식 요소들
   */
  ...children: ChildrenType
) => {
  if (type === React.Fragment) {
    return {
      name: React.Fragment,
      props,
      children: children.filter((el) => (typeof el === "number" ? true : !!el)).flat()
    };
  }

  return typeof type === "function"
    ? { name: type.name, props, children: type({ ...props, children }) }
    : {
        name: type,
        props,
        children: children.filter((el) => (typeof el === "number" ? true : !!el)).flat()
      };
};

export { createElement, React };
