import Heading from "./components/heading/heading";
import MyImg from "./components/my-img/img";
import React from "react";

const heading = new Heading();
heading.render("Image page");

const img = new MyImg();
img.render();

import("HomeApp/Button").then((ButtonModule) => {
  console.log("Button");
  const Button = ButtonModule.default;
  const button = new Button();
  button.render();
});
