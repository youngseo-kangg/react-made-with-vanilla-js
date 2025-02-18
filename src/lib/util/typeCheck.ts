/**
 * 주어진 객체가 `IReactNode` 타입인지 확인하는 타입 가드 함수
 *
 * @param {any} obj - 검사할 대상 객체
 * @returns {obj is IReactNode} - 객체가 `IReactNode` 타입이면 `true`, 아니면 `false`
 */
const isIReactNode = (obj: any): obj is IReactNode => {
  return obj && "name" in obj && "props" in obj && "children" in obj;
};

/**
 * 주어진 값이 `null` 또는 `undefined`가 아닌지 확인하는 타입 가드 함수
 *
 * @param {unknown} node - 검사할 값
 * @returns {node is Exclude<unknown, null | undefined>} - 값이 유효한 경우 `true`, 그렇지 않으면 `false`
 */
const isValidNode = (node: unknown): node is Exclude<unknown, null | undefined> => {
  return node !== null && node !== undefined;
};

export { isIReactNode, isValidNode };
