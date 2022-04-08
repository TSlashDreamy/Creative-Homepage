import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
import style from "./card.module.css";
import CardDescription from "../description/CardDescription";
import CardButton from "../button/CardButton";
import { useTranslation } from "react-i18next";

const Card = (props) => {
  let { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      delay: 150, // values from 0 to 3000, with step 50ms
      duration: 400,
      easing: "ease-in-out",
    });
  });
  return (
    <div data-aos="fade-down" data-aos-delay="250" className={style.card}>
      <div className={style.contentWrapper}>
        <div className={style.type}>
          <p className={style.text}>{t("my_skills_card_type")}</p>
          <svg className={props.skillType}></svg>
        </div>
        <CardDescription
          cardHeader={props.cardHeader}
          cardDescription={props.cardDescription}
        />
        <CardButton type={props.type} />
      </div>
    </div>
  );
};

export default Card;
