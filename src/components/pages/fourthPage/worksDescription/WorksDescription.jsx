import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
import style from "./worksDescription.module.css";
import { useTranslation } from "react-i18next";
import useFirestore from "../../../../hooks/useFirestore";

const WorksDescription = () => {
  let { t } = useTranslation();
  const { docs } = useFirestore("works");

  useEffect(() => {
    AOS.init({
      delay: 150, // values from 0 to 3000, with step 50ms
      duration: 400,
      easing: "ease-in-out",
    });
  });
  return (
    <div className={style.textWrapper}>
      {/* WORK COUNTER */}
      <div className={style.counterWrapper}>
        <h2 data-aos="fade-down" className={style.worksCounter}>
          {docs.length}
        </h2>
        <div data-aos="fade-down" className={style.descriptionWrapper}>
          <p className={style.counterDescription}>
            {t("my_works_counter_description_fl")}
          </p>
          <p className={style.counterDescription}>
            {t("my_works_counter_description_sl")}
          </p>
        </div>
      </div>
      {/* WORK TYPE */}
      <div className={style.nameWrapper}>
        <div className={style.typeWrapper}>
          <p data-aos="fade-down" data-aos-delay="200" className={style.type}>
            {t("my_works_type")}
          </p>
        </div>
        <h2
          data-aos="fade-down"
          data-aos-delay="200"
          className={style.worksType}
        >
          FrontEnd / BackEnd
        </h2>
      </div>
    </div>
  );
};

export default WorksDescription;
