import AOS from "aos";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import style from "./colorPage.module.css";
import "aos/dist/aos.css";
import ColorBox from "./colorBox/ColorBox";

const ColorPage = () => {
  let { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      delay: 150, // values from 0 to 3000, with step 50ms
      duration: 400,
      easing: "ease-in-out",
    });
  });

  const mainColors = [
    style.color_040405,
    style.color_0F0F0F,
    style.color_1C1D21,
    style.color_CFCCCC,
    style.color_F0F0F0,
  ];
  const gradientColors = [
    style.color_8942AD,
    style.color_F52C2E,
    style.color_FCC25B,
    style.color_gradient,
  ];

  return (
    <section className={style.section} id="typography">
      <div data-aos="fade-down" className={style.sectionHeader}>
        <h2>{t("branding_second_header")}</h2>
        <div
          data-aos="fade-down"
          data-aos-delay="100"
          className={style.typeWrapper}
        >
          <p>{t("branding_second_mainPalette")}</p>
        </div>
        <div
          data-aos="fade-down"
          data-aos-delay="370"
          className={style.colorsWrapper}
        >
          {mainColors.map((colors, index) => {
            return <ColorBox key={index} color={colors} />;
          })}
        </div>
        <div
          data-aos="fade-down"
          data-aos-delay="100"
          className={style.typeWrapper}
        >
          <p>{t("branding_second_gradientPalette")}</p>
        </div>
        <div
          data-aos="fade-down"
          data-aos-delay="770"
          className={style.colorsWrapper}
        >
          {gradientColors.map((colors, index) => {
            return <ColorBox key={index} color={colors} />;
          })}
        </div>
      </div>
      <div className={style.wrapper}></div>
    </section>
  );
};

export default ColorPage;
