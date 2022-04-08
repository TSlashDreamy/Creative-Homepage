import style from "./sectiondesc.module.css";
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";

const SectionDescription = () => {
  let { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      delay: 150, // values from 0 to 3000, with step 50ms
      duration: 400,
      easing: "ease-in-out",
    });
  });
  return (
    <div className={style.textWrapper}>
      <p className={style.preDescription} data-aos="fade-down">
        {t("my_skills_predescription")}
      </p>
      <h2
        className={style.descriptionHeader}
        data-aos="fade-down"
        data-aos-delay="200"
      >
        {t("my_skills_header")}
      </h2>
    </div>
  );
};

export default SectionDescription;
