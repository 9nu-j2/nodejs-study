# 자바스크립트 브라우저 내부 동작과정

- 자바스크립트 엔진
- web API
- callback queue

## 자바스크립트 엔진

두 가지 주요 구성요소 : 메모리 힙 과 호출 스택으로 구성됨

비동기 작업은 Web API에서 동작하다 완료된 결과는 콜백 큐로 이동해서 대기하다가 콜 스택으로 에 작업이 없으면 콜 스택으로 이동
