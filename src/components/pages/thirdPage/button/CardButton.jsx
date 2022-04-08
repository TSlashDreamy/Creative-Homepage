import style from "./cardbutton.module.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Howl } from "howler";
import { LinkHoverSound, LinkClickSound } from "../../../../soundConstants";

const CardButton = (props) => {
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

  let { t } = useTranslation();

  return (
    <div className={style.buttonContainer}>
      <Link to={props.type}>
        <button
          onMouseOver={HoverOnLink}
          onClick={ClickOnLink}
          className={style.cardCheck}
        >
          {t("my_skills_card_button")}
        </button>
      </Link>
    </div>
  );
};
export default CardButton;
