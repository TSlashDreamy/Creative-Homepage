import { useState } from "react";
import style from "./colorBox.module.css";
import { BsCheckLg } from "react-icons/bs";
import { Howl } from "howler";
import { PickedColorSound } from "../../../../../soundConstants";

const ColorBox = (props) => {
  const ClickOnColor = () => {
    const Click = new Howl({
      src: [PickedColorSound],
      volume: 0.7,
    });
    Click.play();
  };

  const [copied, setCopied] = useState(null);

  function getCopy() {
    let element = document.getElementById(props.color);
    let style = window.getComputedStyle(element, "::after");
    let preContent = style.getPropertyValue("content");
    let content = preContent.slice(1, -1);
    navigator.clipboard.writeText(content);
    ClickOnColor();
    setCopied(true);

    setTimeout(() => {
      setCopied(null);
    }, 400);
  }

  return (
    <div
      onClick={getCopy}
      id={props.color}
      className={`${style.colorBox} ${props.color}`}
    >
      <BsCheckLg
        className={`${style.checkIcon} ${
          copied ? style.copied : style.notCopied
        }`}
      />
    </div>
  );
};

export default ColorBox;
