import background from "./background.module.css";
import DustParticles from "./dustParticles/DustParticles";
import { useSpring, animated, easings } from "react-spring";
import { useState } from "react";
import leftObj from "../../objects/left.png";
import rightObj from "../../objects/right.png";
import bottomObj from "../../objects/bottom.png";

const Background = () => {
  const [flip, set] = useState(false);
  const floating = useSpring({
    to: { marginTop: 5 },
    from: { marginTop: -5 },
    reverse: flip,
    delay: 0,
    config: {
      duration: 1200,
      easing: easings.easeInOutQuad,
    },
    onRest: () => set(!flip),
  });
  const [flip1, set1] = useState(false);
  const floatingl = useSpring({
    to: { marginTop: 20 },
    from: { marginTop: -10 },
    reverse: flip1,
    delay: 0,
    config: {
      duration: 2700,
      easing: easings.easeInOutQuad,
    },
    onRest: () => set1(!flip1),
  });
  const [flip2, set2] = useState(false);
  const floatingr = useSpring({
    to: { marginTop: 20 },
    from: { marginTop: -20 },
    reverse: flip2,
    delay: 0,
    config: {
      duration: 2300,
      easing: easings.easeInOutQuad,
    },
    onRest: () => set2(!flip2),
  });
  return (
    <div className={background.background}>
      <DustParticles />
      <div className={background.objects}>
        <animated.img
          style={floating}
          className={`${background.bottom} ${background.bottomPos0}`}
          id="bottomObj"
          src={bottomObj}
          alt="bottomOBJ"
        />
        <animated.img
          style={floatingl}
          className={`${background.left} ${background.leftPos0}`}
          id="leftObj"
          src={leftObj}
          alt="leftOBJ"
        />
        <animated.img
          style={floatingr}
          className={`${background.right} ${background.rightPos0}`}
          id="rightObj"
          src={rightObj}
          alt="rightOBJ"
        />
      </div>
    </div>
  );
};

export default Background;
