const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb+srv://nit:Nit220802@cluster0.gv1lgie.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("mongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/static", express.static(path.join(__dirname, "public"))); // 정작 파일 웹 제공, 절대경로로 제공

const port = 4000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
