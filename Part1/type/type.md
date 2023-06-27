자바스크립트는 2가지 타입으로 나눠짐

- 원시 타입(primitive typr): Boolean, String, Number, null, undefined, Symbol
- 참조 타입(Objective type): Object, Array

원시 타입은 고정된 크기로 Call Stack 메모리에 저장되며, 실제 데이터가 변수에 할당된다

참조 타입은 데이터 크기가 정해지지 않고 Call Stack 메모리에 저장, 데이터의 값이 heap에 저장되며 변수에 heap 메모리의 주소값이 할당된다.
값의 주소가 할당되는 것이므로 불변성을 유지시켜주기 위한 방식이 필요함

# 자바스크립트는 동적 타입입니다.

같은 변수가 여러개의 타입을 가질 수 있음
타입을 명시하지 않아도 됨
