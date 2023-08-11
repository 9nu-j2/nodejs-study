const request = require("./request");
const response = require("./response");

function makeRequest(url, data) {
  // 요청을 보내기, send 모듈 가져오기
  request.send(url, data);
  // 데이터를 return 하기, read 모듈 가져오기
  return response.read();
}

const responseData = makeRequest("https://naver.com", "any data");
