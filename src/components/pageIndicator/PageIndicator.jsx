import "./pageIndicator.css";
import { useTranslation } from "react-i18next";
import { Howl } from "howler";
import { ClickSound } from "../../soundConstants";

const PageIndicator = () => {
  let { t } = useTranslation();

  function Play() {
    const SoundClick = new Howl({
      src: [ClickSound],
      volume: 0.7,
    });
    SoundClick.play();
  }

  return (
    <ul className="pageIndicator">
      <li onClick={Play}>
        <div className="contentWrapper">
          <p className="sectionName selected">{t("indicator_welcome")}</p>
          <div>
            <p className="sectionNum selected">01</p>
          </div>
          <p className="sectionIndicator selected"></p>
        </div>
      </li>
      <li onClick={Play}>
        <div className="contentWrapper">
          <p className="sectionName">{t("indicator_about_me")}</p>
          <div>
            <p className="sectionNum">02</p>
          </div>
          <p className="sectionIndicator"></p>
        </div>
      </li>
      <li onClick={Play}>
        <div className="contentWrapper">
          <p className="sectionName">{t("indicator_my_skills")}</p>
          <div>
            <p className="sectionNum">03</p>
          </div>
          <p className="sectionIndicator"></p>
        </div>
      </li>
      <li onClick={Play}>
        <div className="contentWrapper">
          <p className="sectionName">{t("indicator_my_works")}</p>
          <div>
            <p className="sectionNum">04</p>
          </div>
          <p className="sectionIndicator"></p>
        </div>
      </li>
      <li onClick={Play}>
        <div className="contentWrapper">
          <p className="sectionName">{t("indicator_contacts")}</p>
          <div>
            <p className="sectionNum">05</p>
          </div>
          <p className="sectionIndicator"></p>
        </div>
      </li>
    </ul>
  );
};

export default PageIndicator;
