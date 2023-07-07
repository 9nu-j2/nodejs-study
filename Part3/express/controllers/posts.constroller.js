const path = require("path");

function getPost(req, res) {
  res.sendFile(path.join(__dirname, "..", "public", "images", "forest.jpeg"));
}

module.exports = {
  getPost,
};
