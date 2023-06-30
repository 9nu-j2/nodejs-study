const http = require("http");
const PORT = 4000;
const targetObject = { a: "a", b: "b" };
const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/home") {
    req.on("data", (data) => {
      console.log(data);
      const stringfiedData = data.toString();
      console.log(stringfiedData);
      Object.assign(targetObject, JSON.parse(stringfiedData));
    });
  }
  if (req.url === "/home") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ a: "a", b: "b" }));
  } else if (req.url === "/about") {
    res.setHeader("Content-type", "test/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<h1>About Page</h1>");
    res.write("</body>");
    res.write("</html>");
  } else {
    res.statusCode = 404;
    res.end();
    ``;
  }
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
