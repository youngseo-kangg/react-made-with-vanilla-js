import { rerender } from "@react/render";
import { deepEqual } from "src/lib/util";

type SetState<T> = (newState: T | ((prevState: T) => T)) => void;
const stateStore: unknown[] = []; // 여러 useState 호출을 위한 상태 저장 배열
let stateIndex = 0; // useState가 여러 개일 때 각 state를 구분하는 인덱스

function useState<T>(initialState: T): [T, SetState<T>] {
  const currentIndex = stateIndex; // 현재 useState 호출의 인덱스
  stateStore[currentIndex] = stateStore[currentIndex] ?? initialState;
  const state = stateStore[currentIndex] as T;

  const setState: SetState<T> = (newState) => {
    const prevState = stateStore[currentIndex] as T;
    const nextState =
      typeof newState === "function" ? (newState as (prev: T) => T)(prevState) : newState;

    if (!deepEqual(prevState, nextState)) {
      stateStore[currentIndex] = nextState;
      console.log(`state updated: ${stateStore[currentIndex]}`);

      if (rerender) rerender(); // 상태 변경이 감지되면 rerender 실행
    }
  };

  stateIndex++; // 다음 useState 호출을 위한 인덱스 증가
  return [state as T, setState];
}

export { useState };
