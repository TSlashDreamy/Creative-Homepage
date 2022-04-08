import style from "./confirmBox.module.css";
import { projectFirestore } from "../../firebase/config";
import { projectStorage } from "../../firebase/config";
import { useTranslation } from "react-i18next";
import { Howl } from "howler";
import { HoverSound, ClickSound } from "../../soundConstants";

import React from "react";

function ConfirmBox({
  confirm,
  setConfirm,
  selectedId,
  setSelectedId,
  selectedUrl,
  setSelectedUrl,
}) {
  const ClickSoundTriggered = () => {
    const AddClicked = new Howl({
      src: [ClickSound],
      volume: 0.7,
    });
    AddClicked.play();
  };

  const HoverSoundTriggered = () => {
    const HoveredSound = new Howl({
      src: [HoverSound],
      volume: 0.7,
    });
    HoveredSound.play();
  };

  const CloseWindow = () => {
    setConfirm(false);
    ClickSoundTriggered();
  };

  const ResetSelectedWork = () => {
    setSelectedId("");
    setSelectedUrl("");
  };

  const DeleteWork = () => {
    ClickSoundTriggered();
    try {
      projectFirestore.collection("works").doc(selectedId).delete();
      projectStorage.refFromURL(selectedUrl).delete();
      setConfirm(false);
      ResetSelectedWork();
    } catch (e) {
      console.error("Can't delete work: " + e);
    }
  };

  let { t } = useTranslation();

  return (
    <div
      style={
        confirm
          ? { opacity: 1, transform: "scale(1)" }
          : { opacity: 0, transform: "scale(0)" }
      }
      className={style.background}
    >
      <h2 className={style.header}>{t("confirmation_header")}</h2>
      <p className={style.description}>{t("confirmation_description")}</p>
      <div className={style.buttonsWrapper}>
        <button
          onClick={CloseWindow}
          onMouseOver={HoverSoundTriggered}
          className={`${style.button} ${style.buttonCancel}`}
        >
          {t("confirmation_cancel")}
        </button>
        <button
          onClick={DeleteWork}
          onMouseOver={HoverSoundTriggered}
          className={`${style.button} ${style.buttonDelete}`}
        >
          {t("confirmation_delete")}
        </button>
      </div>
    </div>
  );
}

export default ConfirmBox;
