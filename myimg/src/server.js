const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use("/", express.static(path.resolve(__dirname, "../dist")));

app.get("/", (req, res) => {
  const pathToHtmlFile = path.resolve(__dirname, "../dist/my-img.html");
  const contentOfHtmlFile = fs.readFileSync(pathToHtmlFile, "utf-8");

  res.send(contentOfHtmlFile);
});

app.listen(9002, () => {
  console.log("Server is running on port 9002");
});
