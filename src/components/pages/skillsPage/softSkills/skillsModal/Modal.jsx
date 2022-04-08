import style from "../../../../modal/modal.module.css";
import { BsFilePlus } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import React, { useRef, useState } from "react";
import { Howl } from "howler";
import { SuccessSound, ClickSound } from "../../../../../soundConstants";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { projectFirestore, timestamp } from "../../../../../firebase/config";

const UploadedSuccesfull = new Howl({
  src: [SuccessSound],
  volume: 0.6,
});

const CloseSound = () => {
  const AddClicked = new Howl({
    src: [ClickSound],
    volume: 0.7,
  });
  AddClicked.play();
};

function Modal(props) {
  const box = useRef(0);
  const nameInput = useRef(0);
  const urlInput = useRef(0);
  const frameworkInput = useRef(0);
  const [workName, setWorkName] = useState("");
  const [workFramework, setWorkFramework] = useState("");
  const [workUrl, setWorkUrl] = useState("");
  const [ready, setReady] = useState(false);

  let { t } = useTranslation();

  const changeName = () => {
    setWorkName(nameInput.current.value);
  };

  const changeUrl = () => {
    setWorkUrl(urlInput.current.value);
  };

  const changeFramework = () => {
    setWorkFramework(frameworkInput.current.value);
  };

  const resetFields = () => {
    setWorkName("");
    setWorkUrl("");
    setWorkFramework("");
    props.setModal(false);
  };

  const checkData = () => {
    if (workName === "" || workUrl === "" || workFramework === "") {
      return;
    }
    setReady(true);
    UploadedSuccesfull.play();
  };

  const pushData = () => {
    checkData();
  };

  function closeModal() {
    setReady(false);
    resetFields();
    CloseSound();
  }

  useEffect(() => {
    if (ready === false) {
      setReady(false);
      resetFields();
    }
    if (ready === true) {
      const createdAt = timestamp();
      projectFirestore.collection("softSkills").add({
        createdAt: createdAt,
        name: workName,
        type: workFramework,
        url: workUrl,
      });
      setReady(false);
    }
  }, [ready]);

  return (
    <div
      ref={box}
      style={
        props.modal
          ? {
              opacity: 1,
              transform: "scale(1) translate(50%, -50%)",
              zIndex: "1000",
            }
          : {
              opacity: 0,
              transform: "scale(0) translate(50%, -50%)",
              zIndex: "-1000",
            }
      }
      className={style.blurredBack}
    >
      <div className={style.modal}>
        <button onClick={closeModal} className={style.closeBtn}>
          <MdClose />
        </button>
        <h3 className={style.header}>{t("modal_addYour")} "Soft skill"</h3>
        <div className={style.workProperties}>
          <div className={style.addNewIcon}>
            <BsFilePlus />
          </div>
          <div className={style.inputWrapper}>
            <input
              className={`${style.text} ${style.nameInput}`}
              type="text"
              value={workName}
              onChange={changeName}
              placeholder={t("modal_namePlaceholder")}
              ref={nameInput}
              required
            ></input>
            <input
              className={`${style.text} ${style.urlInput}`}
              type="text"
              value={workFramework}
              onChange={changeFramework}
              placeholder={t("my_skills_card_type")}
              ref={frameworkInput}
              required
            ></input>
            <input
              className={`${style.text} ${style.urlInput}`}
              type="url"
              value={workUrl}
              onChange={changeUrl}
              placeholder={t("modal_urlPlaceholder")}
              ref={urlInput}
              required
            ></input>
            <input
              onClick={pushData}
              className={style.submit}
              type="submit"
              value={t("modal_buttonContent")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
