import style from "./button.module.css";
import { Howl } from "howler";
import { LinkHoverSound, LinkClickSound } from "../../../../../soundConstants";

const Button = (props) => {
  const HoverOnLink = () => {
    const LinkOnHover = new Howl({
      src: [LinkHoverSound],
      volume: 0.7,
    });
    LinkOnHover.play();
  };

  const ClickOnLink = () => {
    const SoundLinkClick = new Howl({
      src: [LinkClickSound],
      volume: 0.7,
    });
    SoundLinkClick.play();
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        ClickOnLink();
        window.location.href = props.link;
      }}
      className={style.contactLink}
    >
      {props.icon}
      <span onMouseOver={HoverOnLink}>{props.name}</span>
    </button>
  );
};

export default Button;
