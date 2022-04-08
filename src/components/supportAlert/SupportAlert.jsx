import style from "./supportAlert.module.css";
import Button from "../button/Button";
import buttonStyle from "../button/button.module.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import React from "react";
function SupportAlert() {
  let { t } = useTranslation();

  const [hiden, setHiden] = useState(false);
  function hideWarning() {
    setHiden(true);
  }
  return (
    <div
      style={hiden ? { opacity: 0, transform: "scale(0)" } : { opacity: 1 }}
      className={style.blurredBackground}
    >
      <h3 className={style.header}>{t("warning_header")}</h3>
      <p className={style.description}>{t("warning_description")}</p>
      <div className={style.buttonFunctionalWrapper} onClick={hideWarning}>
        <Button
          content={t("warning_button")}
          style={`${buttonStyle.btn} ${buttonStyle.dangerBtn}`}
        />
      </div>
    </div>
  );
}

export default SupportAlert;
