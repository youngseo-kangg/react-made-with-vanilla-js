import { React } from "src/const/react";

/**
 * 가상 DOM 요소를 생성하는 함수입니다.
 */
type ICreateElement = (
  type: ElementType,
  props: ElementPropsType,
  ...children: VirtualNode[]
) => IReactNode;

const createElement: ICreateElement = (
  /**
   * 요소의 타입 (함수형 컴포넌트 또는 HTML 태그)
   */
  type,
  /**
   * 요소에 전달된 속성(프로퍼티)
   */
  props,
  /**
   * 요소의 자식 요소들
   */
  ...children
) => {
  const flatChildren = children.filter((el) => (typeof el === "number" ? true : !!el)).flat();

  if (type === React.Fragment) {
    return {
      name: React.Fragment,
      props,
      children: flatChildren
    };
  }

  return typeof type === "function" // 함수형 컴포넌트인 경우
    ? type(Object.assign({}, type, props, { children: [...flatChildren] }))
    : {
        name: type,
        props,
        children: flatChildren
      };
};

export { createElement, React };
