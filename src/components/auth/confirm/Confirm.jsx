import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import Logo from "../../header/logo/Logo";
import { useTranslation } from "react-i18next";
import style from "./confirm.module.css";
import pageSpy from "../../pageIndicator/pageSpy";

const Confirm = () => {
  let { t } = useTranslation();

  const { signInWithEmailLink } = useAuth();
  const history = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      await signInWithEmailLink(
        process.env.REACT_APP_ADMIN_EMAIL,
        location.search
      );
      history("/", { replace: true });
      window.history.replaceState({}, document.title, "/#/" + "");
    } catch (error) {
      setError(error);
    }
  };
  setTimeout(function () {
    onSubmit();
  }, 2000);
  setTimeout(function () {
    pageSpy();
  }, 3000);
  return (
    <div className={style.background}>
      <div className={style.logo}>
        <Logo />
        <span className={style.logoSpan}>/TSlash</span>
      </div>
      <span className={style.text}>{error ? error : t("owner_confirmed")}</span>
    </div>
  );
};

export default Confirm;
