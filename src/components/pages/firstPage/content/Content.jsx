import AOS from "aos";
import { useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import "aos/dist/aos.css";
import content from "./content.module.css";
import Button from "../../../button/Button";
import buttonStyle from "../../../button/button.module.css";
import { useTranslation } from "react-i18next";
import ScrollArrow from "../../../scrollArrow/ScrollArrow";

const Content = () => {
  let { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      delay: 150, // values from 0 to 3000, with step 50ms
      duration: 400,
      easing: "ease-in-out",
    });
  });

  return (
    <section id="welcome" className={content.welcomeSection}>
      <div>
        <h1 className={content.welcomeHeader} data-aos="fade-down">
          Tslash
        </h1>
        <p data-aos="fade-down" className={content.welcomeDesc}>
          {t("welcome_description")}
        </p>
        <ScrollLink to="aboutMe">
          <Button
            content={t("welcome_button")}
            style={buttonStyle.btnContainer}
            btnStyle={buttonStyle.btn}
          />
        </ScrollLink>
      </div>
      <div className={content.adaptiveArrow}>
        <ScrollArrow />
      </div>
    </section>
  );
};

export default Content;
