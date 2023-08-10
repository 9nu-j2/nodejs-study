const path = require("path");

function getPost(req, res) {
  res.render("posts", {
    templateNmae: "posts",
  });
}

module.exports = {
  getPost,
};
