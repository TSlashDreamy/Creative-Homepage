import style from "./scrollArrow.module.css";
import { useTranslation } from "react-i18next";

const ScrollArrow = () => {
  let { t } = useTranslation();

  return (
    <>
      <p className={style.scrollText}>{t("scroll_arrow")}</p>
      <div className={style.arrowBox}>
        <span className={style.arrowDot}></span>
        <span className={style.secondArrow}></span>
        <span className={style.finalArrow}></span>
      </div>
    </>
  );
};

export default ScrollArrow;
