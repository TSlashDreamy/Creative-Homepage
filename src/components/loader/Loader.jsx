import style from "./loader.module.css";
import Logo from "./Logo";
import React from "react";
import { useTranslation } from "react-i18next";

function Loader() {
  let { t } = useTranslation();

  return (
    <div className={style.background}>
      <Logo />
      <p className={style.text}>{t("owner_email_sended")}</p>
    </div>
  );
}

export default Loader;
