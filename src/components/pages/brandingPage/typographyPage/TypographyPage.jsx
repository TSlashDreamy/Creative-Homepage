import AOS from "aos";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import style from "./typographyPage.module.css";
import "aos/dist/aos.css";
import ScrollArrow from "../../../scrollArrow/ScrollArrow";

const TypographyPage = () => {
  let { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      delay: 150, // values from 0 to 3000, with step 50ms
      duration: 400,
      easing: "ease-in-out",
    });
  });
  return (
    <section className={style.section} id="typography">
      <div data-aos="fade-down" className={style.sectionHeader}>
        <h2>{t("branding_first_header")}</h2>
        <div className={style.typeWrapper}>
          <p>{t("branding_first_sectionName")}</p>
        </div>
      </div>
      <div className={style.wrapper}>
        {/* Open Sans */}
        <div
          data-aos="fade-down"
          data-aos-delay="300"
          className={`${style.fontWrapper} ${style.openSans}`}
        >
          <p className={style.fontPreview}>Aa</p>
          <div className={style.fontProperties}>
            <p>{t("branding_first_primaryFont")}: Open Sans</p>
            <p>
              {t("branding_first_weight")}:{" "}
              {t("branding_first_fontFProperties")}
            </p>
          </div>
          <div className={`${style.fontAlphabetPreview} ${style.omgwhy}`}>
            <p>A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</p>
            <p>a b c d e f g h i j k l m n o p q r s t u v w x y z</p>
          </div>
        </div>

        {/* Trueno */}
        <div
          data-aos="fade-down"
          data-aos-delay="300"
          className={`${style.fontWrapper} ${style.trueno}`}
        >
          <p className={style.fontPreview}>Aa</p>
          <div className={style.fontProperties}>
            <p>{t("branding_first_secondaryFont")}: Trueno</p>
            <p>
              {t("branding_first_weight")}:{" "}
              {t("branding_first_fontSProperties")}
            </p>
          </div>
          <div className={style.fontAlphabetPreview}>
            <p>A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</p>
            <p>a b c d e f g h i j k l m n o p q r s t u v w x y z</p>
          </div>
        </div>
      </div>
      <div className={style.hint}>
        <ScrollArrow data-aos="fade-down" />
      </div>
    </section>
  );
};

export default TypographyPage;
