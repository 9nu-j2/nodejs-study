function encrypt(data) {
  return "encrypted data";
}

function send(url, data) {
  const encryptedData = encrypt(data);
  console.log(`${encryptedData} is being sent to ${url}`);
}

module.exports.A = 1;

module.exports.encrypt = function encrypt(data) {
  return;
};

module.exports = {
  send,
};

// 객체로 exports 하는게 제일 좋은 방법
//
