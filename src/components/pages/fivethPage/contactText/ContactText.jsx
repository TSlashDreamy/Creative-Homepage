import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
import style from "./contactText.module.css";
import { useTranslation } from "react-i18next";

const ContactText = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      delay: 150, // values from 0 to 3000, with step 50ms
      duration: 400,
      easing: "ease-in-out",
    });
  });
  return (
    <div className={style.textWrapper}>
      <div className={style.predescriptionWrapper}>
        <p className={style.predescription}>{t("contacts_predescription")}</p>
      </div>
      <h2 data-aos="fade-down" className={style.header}>
        {t("contacts_header")}
      </h2>
      <p
        data-aos="fade-down"
        data-aos-delay="160"
        className={style.description}
      >
        {t("contacts_description")}
      </p>
      <p data-aos="fade-down" data-aos-delay="170" className={style.waterMark}>
        ©️ Copyright 2022 | /TSlash
      </p>
    </div>
  );
};

export default ContactText;
