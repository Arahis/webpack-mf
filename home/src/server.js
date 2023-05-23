const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use("/", express.static(path.resolve(__dirname, "../dist")));

app.get("/", (req, res) => {
  const pathToHtmlFile = path.resolve(__dirname, "../dist/home.html");
  const contentOfHtmlFile = fs.readFileSync(pathToHtmlFile, "utf-8");

  res.send(contentOfHtmlFile);
});

app.listen(9001, () => {
  console.log("Server is running on port 9001");
});
