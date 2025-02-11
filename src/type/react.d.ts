/**
 * 함수형 컴포넌트
 */
type Component = <T extends { children: VirtualNode[] }>(props: T) => JSX.Element;

/**
 * 유효한 요소 타입을 정의합니다.
 * 문자열(HTML 태그 이름), 함수형 컴포넌트 또는 React.Fragment이 될 수 있습니다.
 */
type ElementType = keyof HTMLElementTagNameMap | Component | typeof Fragment;

/**
 * 요소의 속성(프로퍼티)을 나타냅니다.
 * 문자열 키와 해당하는 값을 가지는 객체입니다.
 */
type ElementPropsType = Record<string, unknown> | null;

/**
 * React 스타일의 가상 DOM 노드를 나타냅니다.
 */
interface IReactNode {
  /** 요소의 태그명 */
  name: keyof HTMLElementTagNameMap;
  /** 요소에 전달된 속성(프로퍼티) ... className, id, target, ... */
  props: ElementPropsType;
  /** 요소의 자식 요소들 (문자열 배열 또는 `IReactNode` 배열) */
  children?: VirtualNode[];
}

type BasicNode =
  // JSX에서 string, number는 TextNode로 렌더링됨
  | string // 텍스트 노드
  | number // 숫자 노드
  // JSX에서는 null, undefined, boolean 값이 렌더링되지 않음 -> ""로 처리
  | boolean
  | null
  | undefined
  // JSX 내부의 (여러 개의 JSX 요소 포함 가능한)배열
  | Array<VirtualNode>;

type VirtualNode = BasicNode | IReactNode;
