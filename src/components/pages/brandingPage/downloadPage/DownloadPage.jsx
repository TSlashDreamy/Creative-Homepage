import AOS from "aos";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import style from "./downloadPage.module.css";
import "aos/dist/aos.css";
import DownloadButton from "./button/DownloadButton";

const DownloadPage = () => {
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
        <h2>{t("branding_third_header")}</h2>
        <div
          data-aos="fade-down"
          data-aos-delay="100"
          className={style.typeWrapper}
        >
          <p>{t("branding_third_Fsection")}</p>
        </div>

        <div
          data-aos="fade-down"
          data-aos-delay="100"
          className={style.buttonsWrapper}
        >
          <DownloadButton
            url="https://drive.google.com/drive/folders/1cqsd6SPqQitIggr8y_BJbDfPRZ3dz9Vv?usp=sharing"
            name="Adobe illustrator"
          />
          <DownloadButton
            url="https://drive.google.com/drive/folders/1jyoRBh7lJgVYyCrCeSpl1VjGqVOyiKOV?usp=sharing"
            name="Png"
          />
          <DownloadButton
            url="https://drive.google.com/drive/folders/1d-h-teEEkganx2RniDlLB4-TPQw-wApD?usp=sharing"
            name="Svg"
          />
          <DownloadButton
            url="https://drive.google.com/drive/folders/1yCiYHoPJEHA0ag2ua_ugRrpeDUfM6x3N?usp=sharing"
            name="Blender"
          />
        </div>
        <div
          data-aos="fade-down"
          data-aos-delay="100"
          className={style.typeWrapper}
        >
          <p>{t("branding_third_Ssection")}</p>
        </div>
        <div
          data-aos="fade-down"
          data-aos-delay="100"
          className={style.buttonsWrapper}
        >
          <DownloadButton
            url="https://drive.google.com/drive/folders/1GWCMkeU_a3DjfS6q89vR0-LVjT24r-Kk?usp=sharing"
            name="Adobe XD"
          />
          <DownloadButton
            url="https://drive.google.com/drive/folders/1HAT7tlrIqyhGTNlEEt2WE6EowataUAsl?usp=sharing"
            name="Png"
          />
        </div>
        <div
          data-aos="fade-down"
          data-aos-delay="100"
          className={style.typeWrapper}
        >
          <p>{t("branding_third_Tsection")}</p>
        </div>
        <div
          data-aos="fade-down"
          data-aos-delay="100"
          className={style.buttonsWrapper}
        >
          <DownloadButton
            url="https://github.com/TSlashDreamy/Creative-Homepage"
            name="Github"
          />
          <DownloadButton
            url="https://drive.google.com/drive/folders/1uGP2fTSvNKCUsq6iolZqtgk5Kz4uf2bV?usp=sharing"
            name="Sounds"
          />
        </div>
        <span
          data-aos="fade-down"
          data-aos-delay="100"
          className={style.copyright}
        >
          ©️ Copyright 2022 | /TSlash
        </span>
      </div>
    </section>
  );
};

export default DownloadPage;
