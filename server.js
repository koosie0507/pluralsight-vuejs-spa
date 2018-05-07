const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const indexHTML = (function readIndexHtmlFile() {
  return fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf-8");
})();

app.use("/dist", express.static(path.resolve(__dirname, "./dist")));

app.get('*', function (req, res) {
  res.write(indexHTML);
  res.end();
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`server started at http://localhost:${port}`);
});
