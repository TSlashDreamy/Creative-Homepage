import { useState, useEffect, useCallback } from "react";
import language from "./language.module.css";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";
import { Howl } from "howler";
import { ChangeLangSound } from "../../soundConstants";

const Language = (props) => {
  const SoundChangeLang = new Howl({
    src: [ChangeLangSound],
    volume: 1.0,
  });

  let { t } = useTranslation();
  let currentLang = cookies.get("i18next") || "en"; // get cached lang or switch "en"(ENGLISH) by default
  let [enActive, setEnActive] = useState();
  let [ruActive, setRuActive] = useState();
  let [uaActive, setUaActive] = useState();
  let [langChange, setLangChange] = useState();

  const resetSelection = useCallback(() => {
    setEnActive();
    setRuActive();
    setUaActive();
  }, []);

  const select = useCallback(() => {
    switch (currentLang) {
      case "en":
        setEnActive("active");
        break;
      case "ru":
        setRuActive("active");
        break;
      case "ua":
        setUaActive("active");
        break;
      default:
        resetSelection();
        break;
    }
  }, [currentLang, resetSelection]);

  const changeLanguage = (lang) => {
    // change language
    setTimeout(function () {
      i18next.changeLanguage(lang);
      currentLang = lang;
    }, 400);
    resetSelection();
    // select() function called in useEffect() after each page rerender
  };

  const changingAnimation = (lang) => {
    // if already selected return
    if (currentLang === lang) {
      return;
    }
    SoundChangeLang.play();
    setLangChange("active");
    changeLanguage(lang);
    setTimeout(function () {
      setLangChange();
    }, 1500);
  };

  useEffect(() => {
    document.title = t("Loading"); // setting page title
    select(); // highligting current language button
  }, [t, select]);

  return (
    <>
      <div
        className={`${language.changeLangBackground} ${
          langChange ? language.changing : null
        }`}
      >
        <h2
          className={`${language.selectedLang} ${
            langChange ? language.changingText : null
          }`}
        >
          {t("language")}
        </h2>
        <span
          className={`${language.egg} ${
            langChange ? language.changingEgg : null
          }`}
        >
          {t("egg")}
        </span>
      </div>

      <div id="langContainer" className={language.langContainer}>
        <button
          className={enActive ? language.activeLang : null}
          style={{ fontSize: props.text }}
          onClick={() => changingAnimation("en")}
        >
          ENG
        </button>
        <button
          className={ruActive ? language.activeLang : null}
          style={{ fontSize: props.text }}
          onClick={() => changingAnimation("ru")}
        >
          РУС
        </button>
        <button
          className={uaActive ? language.activeLang : null}
          style={{ fontSize: props.text }}
          onClick={() => changingAnimation("ua")}
        >
          УКР
        </button>
      </div>
    </>
  );
};

export default Language;
