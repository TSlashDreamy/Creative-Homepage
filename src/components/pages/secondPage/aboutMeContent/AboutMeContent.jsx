import AOS from "aos";
import { useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import "aos/dist/aos.css";
import style from "./aboutMe.module.css";
import Button from "../../../button/Button";
import AvatarObject from "../avatar/AvatarObject";
import buttonStyle from "../../../button/button.module.css";
import { useTranslation } from "react-i18next";

const AboutMeContent = () => {
  let { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      delay: 150, // values from 0 to 3000, with step 50ms
      duration: 400,
      easing: "ease-in-out",
    });
  });
  return (
    <section id="aboutMe">
      <div className={style.wrapper}>
        <div data-aos="fade-down" className={style.avatar}>
          <div className={style.logoBackground}>
            <AvatarObject />
          </div>
        </div>
        <div className={style.description}>
          <div>
            <p data-aos="fade-down" className={style.descriptionName}>
              {t("about_me_predescription")}
            </p>
            <h2 className={style.greetHeader} data-aos="fade-down">
              {t("about_me_greetings")}
            </h2>
            <div
              data-aos="fade-down"
              data-aos-delay="100"
              className={style.mobileLogoBackground}
            >
              <AvatarObject />
            </div>
            <p data-aos="fade-down" className={style.aboutText}>
              {t("about_me_description")}
            </p>
            <ScrollLink to="contacts">
              <Button
                content={t("about_me_button")}
                style={buttonStyle.btnContainerAboutMe}
                btnStyle={buttonStyle.btnAboutMe}
              />
            </ScrollLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeContent;
