/**
 * 아직 렌더링이 완료되지 않은 진행 중인 요소를 나타냅니다.
 * 렌더링 진행중이기 때문에 명시적인 반환값 X
 */
type ElementInProgress = void;

/**
 * 유효한 요소 타입을 정의합니다.
 * 함수형 컴포넌트(`ElementInProgress`를 반환하는 함수) 또는 문자열(HTML 태그 이름)이 될 수 있습니다.
 */
type ElementType = ((props: ElementPropsType) => ElementInProgress) | string;

/**
 * 요소의 속성(프로퍼티)을 나타냅니다.
 * 문자열 키와 해당하는 값을 가지는 객체입니다.
 */
type ElementPropsType = Record<string, unknown>;

/**
 * React 스타일의 가상 DOM 노드를 나타냅니다.
 */
interface IReactNode {
  /** 요소의 태그명 또는 컴포넌트 이름 */
  name: string;
  /** 요소에 전달된 속성(프로퍼티) ... className, id, target, ... */
  props: ElementPropsType;
  /** 요소의 자식 요소들 (문자열 배열 또는 `IReactNode` 배열) */
  children: ChildrenType | ElementInProgress;
}

/**
 * 요소의 자식(children) 타입을 정의합니다.
 * 문자열 배열(텍스트 내용) 또는 `IReactNode` 배열이 될 수 있습니다.
 */
type ChildrenType = (string | IReactNode)[];

interface IReact {
  /**
   * 가상 DOM 요소를 생성하는 함수입니다.
   *
   * @param type - 요소의 타입 (함수형 컴포넌트 또는 HTML 태그)
   * @param props - 요소에 전달된 속성(프로퍼티)
   * @param children - 요소의 자식 요소들
   * @returns 생성된 `IReactNode` 객체
   */
  createElement: (
    type: ElementType,
    props: ElementPropsType,
    ...children: ChildrenType
  ) => IReactNode;
}
const React: IReact = {
  createElement: (type, props: ElementPropsType, ...children: ChildrenType) => {
    return typeof type === "function"
      ? { name: type.name, props, children: type({ ...props, children }) }
      : {
          name: type,
          props,
          children: children.filter((child) => !!child)
        };
  }
};

export default React;
