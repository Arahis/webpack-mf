import "./button.scss";

class Button {
  btnCssClass = "btn-main";
  render() {
    const btn = document.createElement("button");
    const body = document.querySelector("body");
    btn.classList.add(this.btnCssClass);
    btn.innerHTML = "Click Me!";
    btn.onclick = function () {
      const p = document.createElement("p");
      p.classList.add("title");
      p.innerHTML = "You Clicked ME";
      body.appendChild(p);
    };
    body.appendChild(btn);
  }
}

export default Button;
