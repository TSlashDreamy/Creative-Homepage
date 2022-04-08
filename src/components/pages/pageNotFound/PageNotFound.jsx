import style from "./pageNotFound.module.css";
import buttonStyle from "../../button/button.module.css";
import Button from "../../button/Button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import React from "react";

function PageNotFound() {
  let { t } = useTranslation();
  return (
    <div className={style.background}>
      <h2>404</h2>
      <p className={style.desc}>{t("404_desc")}</p>
      <Link to="/">
        <Button
          content={t("404_button")}
          style={buttonStyle.btnContainer}
          btnStyle={buttonStyle.btn}
        />
      </Link>
    </div>
  );
}

export default PageNotFound;
