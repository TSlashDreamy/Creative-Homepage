import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import pageSpy from "./components/pageIndicator/pageSpy";
import App from "./App";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { HashRouter as Router } from "react-router-dom";
import { Howl } from "howler";
import { AmbientSound } from "./soundConstants";

const SoundAmbient = new Howl({
  src: [AmbientSound],
  volume: 0.07,
  loop: true,
});

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["en", "ru", "ua"],
    fallbackLng: "en",
    detection: {
      order: ["cookie", "htmlTag", "localStorage", "path", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "./assets/locales/{{lng}}/translation.json",
    },
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

window.addEventListener("load", (event) => {
  SoundAmbient.play();

  // We need delay for loading script because Auth provider breaking everything
  setTimeout(() => {
    try {
      pageSpy();
    } catch {
      pageSpy();
    }
  }, 1000);

  setTimeout(function () {
    // This hides the address bar for mobile:
    window.scrollTo(0, 1);
  }, 100);
});
