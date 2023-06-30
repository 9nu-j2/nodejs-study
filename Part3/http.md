# HTTP란?

HTML과 같은 리소스들을 가져올 수 있도록 해주는 프로토콜

## HTTP Method

수행할 작업의 종류를 나타내기 위해 서버에 보내는 메시지
브라우저와 서버 간의 더 풍부한 통신이 가능함

- GET : url 매개변수를 사용하여 서버에 데이터를 요청함, 민감한 정보는 노출될 수 있으므로 민감한 정보 요청에는 사용하지 않음
- POST : 사용자가 볼 수 없는 요청 본문으로 전송되므로 민감한 데이터를 처리하는 데 사용
- PUT(update) : 데이터의 전체 교체, 교체 시 모든 필드 필요
- PATCH : 데이터의 부분 교체, 교체 시 일부 필드 필요
- DELETE

## Stateless

상태 비저장 프로토콜. 서버가 여러 요청 기간 동안 각 사용자에 대한 정보나 상태를 유지할 필요가 없음
누군지 기억하게 만드려면 인증 절차가 필요함

## HTTP request, response 구조

### request

- Starter line : HTTP version, Status Code, Status Text
- Headers : 요청하려는 서버 호스트 이름, 쿠키, 인증 정보 등 포함
- Body : 전송하는 데이터가 담겨있는 부분

### response

- Starter line : HTTP version, Status Code, Status Text
- Headers : 요청하려는 서버 호스트 이름, 쿠키, 인증 정보 등 포함, request보다 더 많은 정보를 포함하고 있음
- Body : 전송하는 데이터가 담겨있는 부분

## HTTP Status Code

- 100-199 : 정보 코드
- 200-299 : 성공 코드 (200 OK, 201 Created - POST/PUT 요청에 대한 응답)
- 300-399 : 리다이렉션 코드
- 400-499 : 클라이언트 에러 코드
- 500-599 : 서버 에러 코드
