# Express

nodejs web framework
nodejs의 api를 쉽게 사용할 수 있게 해 줌. 사용자 수가 많아 레퍼런스가 많음
express를 기반으로 다른 framework가 만들어지기도 하므로 알아두면 다른거 배우기도 쉬움

## res.send() vs res.end()

데이터를 제공하지 않고 응답을 종료하려면 res.end()사용 -> 404 등에 사용

## middleware란?

request에 대해 중간에서 처리해주는 역할을 하는 웨어
Express는 본질적으로 일련의 미들웨어 기능 호출

메인 태스크를 마치고 한번씩 미들웨어를 거치고 감

## MVC pattern

모델 - 뷰 - 컨트롤러는 관련 프로그램 로직을 상호 연결된 3개의 요소로 나누는 사용자 인터페이스를 개발하는데 일반적으로 사용되는 소프트웨어 아키텍처 패턴
뷰는 사용자의 동작(버튼 클릭) 컨트롤러는 요청에 맞게 처리, 모델은 데이터를 정의,변경

## template engine

동적인 결과를 정적인 파일(html)에 담아 줌
view와 서버 코드를 따로 작성할 수 있음
템플릿 엔진을 통해 서버 측 애플리케이션에서 동적 html을 생성하는 방법을 제공함
