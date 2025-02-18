export class SyntheticEvent<T = Event> extends CustomEvent<T> {
  /**
   * 이벤트 전파 중지 여부 플래그
   */
  isPropagationStopped: boolean;
  /**
   * 실제 브라우저 이벤트 객체
   */
  nativeEvent: Event;

  constructor(event: Event) {
    super(event.type, event); // CustomEvent로 상속

    this.nativeEvent = event;
    this.isPropagationStopped = false;
  }

  /**
   * 이벤트 전파를 중지하는 메서드.
   * `isPropagationStopped` 값을 `true`로 설정하여 중단 여부를 추적
   */
  stopPropagation() {
    this.isPropagationStopped = true;
  }

  /**
   * 기본 동작을 방지하는 메서드
   * 내부적으로 `nativeEvent.preventDefault()`를 호출
   */
  preventDefault() {
    this.nativeEvent.preventDefault();
  }
}
