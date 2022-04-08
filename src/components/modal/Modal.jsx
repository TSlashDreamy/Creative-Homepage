import style from "./modal.module.css";
import { HiDocumentAdd } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import React, { useRef, useState } from "react";
import { Howl } from "howler";
import { ErrorSound, SuccessSound, ClickSound } from "../../soundConstants";
import { useTranslation } from "react-i18next";
import ProgressBar from "../progressBar/ProgressBar";
import { useEffect } from "react";

const ErrorTrigger = new Howl({
  src: [ErrorSound],
  volume: 0.7,
});

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
  const statusInput = useRef(0);
  const urlInput = useRef(0);
  const logoInput = useRef(0);
  const frameworkInput = useRef(0);
  const [workName, setWorkName] = useState("");
  const [workStatus, setWorkStatus] = useState("");
  const [workSelectedStatus, setWorkSelectedStatus] = useState("");
  const [workFramework, setWorkFramework] = useState("");
  const [workUrl, setWorkUrl] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [ready, setReady] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const types = ["image/svg+xml"];

  let { t } = useTranslation();

  window.addEventListener("offline", function () {
    setIsOnline(false);
  });

  window.addEventListener("online", function () {
    setIsOnline(true);
  });

  const changeHandler = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError(t("modal_svgError"));
      ErrorTrigger.play();
    }
  };

  const changeName = () => {
    setWorkName(nameInput.current.value);
  };

  const changeStatus = () => {
    setWorkStatus(statusInput.current.selectedIndex);
    setWorkSelectedStatus(statusInput.current.value);
  };

  const changeUrl = () => {
    setWorkUrl(urlInput.current.value);
  };

  const changeFramework = () => {
    setWorkFramework(frameworkInput.current.value);
  };

  const resetFields = () => {
    setWorkName("");
    setWorkStatus("");
    setWorkUrl("");
    setWorkFramework("");
    setWorkSelectedStatus("");
    setFile(null);
    setError(null);
    props.setModal(false);
  };

  // url validation function
  function validURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }

  const checkData = () => {
    if (!workName) {
      setError(t("modal_nameError"));
      ErrorTrigger.play();
      return;
    }
    if (!workStatus) {
      setError(t("modal_statusError"));
      ErrorTrigger.play();
      return;
    }
    if (!workFramework) {
      setError(t("modal_frameworksError"));
      ErrorTrigger.play();
      return;
    }
    if (!workUrl) {
      setError(t("modal_urlError"));
      ErrorTrigger.play();
      return;
    }
    if (validURL(workUrl) === false) {
      setError("URL is not valid");
      ErrorTrigger.play();
      return;
    }
    if (!file) {
      setError(t("modal_logoError"));
      ErrorTrigger.play();
      return;
    }

    if (isOnline === false) {
      setError(t("modal_connectionError"));
      ErrorTrigger.play();
      return;
    }
    setError(null);
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
        <h3 className={style.header}>{t("modal_header")}</h3>
        <div className={style.workProperties}>
          <div className={style.addIcon}>
            <HiDocumentAdd />
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
              placeholder={t("modal_frameworkPlaceholder")}
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
            <select
              className={`${style.text} ${style.statusInput}`}
              type="text"
              value={workSelectedStatus}
              onChange={changeStatus}
              ref={statusInput}
              required
            >
              <option value="none" hidden>
                {t("modal_statusPlaceholder")}
              </option>
              <option value={t("modal_active")}>{t("modal_active")}</option>
              <option value={t("modal_done")}>{t("modal_done")}</option>
              <option value={t("modal_inDevelopment")}>
                {t("modal_inDevelopment")}
              </option>
            </select>
            <p className={style.logoText}>{t("modal_logoText")}</p>
            <input
              className={style.file}
              name="file"
              id="file"
              type="file"
              onChange={changeHandler}
              ref={logoInput}
              required
            />
            <label htmlFor="file">+</label>
            <input
              onClick={pushData}
              className={style.submit}
              type="submit"
              value={t("modal_buttonContent")}
            />
            <div className={style.notificationArea}>
              {file && (
                <div className={style.fileName}>
                  {t("modal_pickedFile") + file.name}
                </div>
              )}
              {error && <div className={style.error}>{error}</div>}
            </div>
            {ready && (
              <ProgressBar
                name={workName}
                status={workStatus}
                tech={workFramework}
                workUrl={workUrl}
                file={file}
                setReady={setReady}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
