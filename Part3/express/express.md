# Express

nodejs web framework
nodejs의 api를 쉽게 사용할 수 있게 해 줌. 사용자 수가 많아 레퍼런스가 많음
express를 기반으로 다른 framework가 만들어지기도 하므로 알아두면 다른거 배우기도 쉬움

## res.send() vs res.end()

데이터를 제공하지 않고 응답을 종료하려면 res.end()사용 -> 404 등에 사용

## middleware란?

request에 대해 중간에서 처리해주는 역할을 하는 웨어
Express는 본질적으로 일련의 미들웨어 기능 호출
