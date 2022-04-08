import React, { useState } from "react";
import Loader from "../../loader/Loader";
import { Link } from "react-router-dom";
import Logo from "../../header/logo/Logo";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import style from "./login.module.css";
import { useTranslation } from "react-i18next";
import { Howl } from "howler";
import { HoverSound, ClickSound } from "../../../soundConstants";

const Login = () => {
  let { t } = useTranslation();

  const ClickSoundTriggered = () => {
    const AddClicked = new Howl({
      src: [ClickSound],
      volume: 0.7,
    });
    AddClicked.play();
  };

  const HoverTriggered = () => {
    const HoveredSound = new Howl({
      src: [HoverSound],
      volume: 0.7,
    });
    HoveredSound.play();
  };

  const { handleSubmit } = useForm();
  const { sendSignInLinkToEmail } = useAuth();
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState("");

  const GoBack = () => {
    ClickSoundTriggered();
  };

  const onSubmit = async (data) => {
    try {
      setWaiting(true);
      await sendSignInLinkToEmail(process.env.REACT_APP_ADMIN_EMAIL);
    } catch (error) {
      setError("Whoops, we got an error: " + error);
    }
  };

  return (
    <>
      {waiting ? <Loader /> : ""}
      {error && <span className={style.text}>{error}</span>}
      <div className={style.background}>
        <div className={style.logo}>
          <Logo />
          <span className={style.logoSpan}>/TSlash</span>
        </div>
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <Link to="/">
            <button
              type="button"
              className={`${style.button} ${style.backBtn}`}
              onMouseOver={HoverTriggered}
              onClick={GoBack}
            >
              {t("backHeader")}
            </button>
          </Link>
          <input
            style={
              waiting
                ? { opacity: 0.3, pointerEvents: "none", zIndex: -1 }
                : { opacity: 1, pointerEvents: "all", zIndex: 1 }
            }
            onMouseOver={HoverTriggered}
            onClick={ClickSoundTriggered}
            className={style.button}
            type="submit"
            value={t("owner_login")}
          />
        </form>
      </div>
    </>
  );
};

export default Login;
