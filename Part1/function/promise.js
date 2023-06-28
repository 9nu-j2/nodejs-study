// Promise 객체는 new 키워드와 생성자를 사용해 만듬
// 생성자는 매개변수로 실행 함수를 받음
// 이 함수는 매개 변수로 두 가지 함수를 받아야 하는데, 첫번째 함수는 비동기 작업을 성공적으로 완료했을 때 결과값을 반환할 때 호출
// 두번째 함수는 비동기 작업이 실패해을 때 결과값을 반환

function fetchData() {
  return new Promise((resolve, reject) => {
    const success = true;
    if (success) {
      resolve("성공");
    } else {
      reject("실패");
    }
  });
}

fetchData()
  .then((response) => {
    response.json();
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log("작업 끝!");
  });
