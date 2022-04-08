import style from "./sliderArrows.module.css";
import { useTranslation } from "react-i18next";

const SliderArrows = () => {
  let { t } = useTranslation();

  return (
    <div className={style.arrowsWrapper}>
      <div className={style.leftArrowBox}>
        <span className={style.arrowDot}></span>
        <span className={style.secondArrow}></span>
        <span className={style.finalArrow}></span>
      </div>

      <p className={style.scrollText}>{t("swipe_arrow")}</p>

      <div className={style.rightArrowBox}>
        <span className={style.arrowDot}></span>
        <span className={style.secondArrow}></span>
        <span className={style.finalArrow}></span>
      </div>
    </div>
  );
};

export default SliderArrows;
