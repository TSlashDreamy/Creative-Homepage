import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
import { Howl } from "howler";
import { HoverSound, ClickSound } from "../../soundConstants";

const Button = (props) => {
  const HoverFunc = () => {
    const HoverOn = new Howl({
      src: [HoverSound],
      volume: 0.7,
    });
    HoverOn.play();
  };

  const ClickFunc = () => {
    const ClickOn = new Howl({
      src: [ClickSound],
      volume: 0.7,
    });
    ClickOn.play();
  };

  useEffect(() => {
    AOS.init({
      delay: 150, // values from 0 to 3000, with step 50ms
      duration: 400,
      easing: "ease-in-out",
    });
  });
  return (
    <div data-aos="fade-down" className={props.style}>
      <p onClick={ClickFunc} onMouseOver={HoverFunc} className={props.btnStyle}>
        {props.content}
      </p>
    </div>
  );
};

export default Button;
