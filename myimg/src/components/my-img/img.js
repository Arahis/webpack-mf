import myImg from "./png-img.png";
import imgAlt from "./altText.txt";
import "./img.scss";

class MyImg {
  render() {
    const img = document.createElement("img");
    img.src = myImg;
    img.alt = imgAlt;
    img.classList.add("my-img");

    const body = document.querySelector("body");
    body.appendChild(img);
  }
}

export default MyImg;
