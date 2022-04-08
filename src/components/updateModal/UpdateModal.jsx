import style from "./updateModal.module.css";
import { FiEdit } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import React, { useRef, useState } from "react";
import UpdateBar from "../progressBar/UpdateBar";
import { Howl } from "howler";
import { ErrorSound, SuccessSound, ClickSound } from "../../soundConstants";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { projectFirestore } from "../../firebase/config";
import { projectStorage } from "../../firebase/config";

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

function UpdateModal(props) {
  const box = useRef(0);
  const nameInput = useRef(0);
  const statusInput = useRef(0);
  const urlInput = useRef(0);
  const logoInputs = useRef(0);
  const frameworkInput = useRef(0);
  const [workName, setWorkName] = useState("");
  const [workStatus, setWorkStatus] = useState("");
  const [workSelectedStatus, setWorkSelectedStatus] = useState("");
  const [workFramework, setWorkFramework] = useState("");
  const [workUrl, setWorkUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [files, setFiles] = useState(null);
  const [error, setError] = useState(null);
  const [ready, setReady] = useState(false);
  const [updateReady, setUpdateReady] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const types = ["image/svg+xml"];

  let { t } = useTranslation();

  window.addEventListener("offline", function () {
    setIsOnline(false);
  });

  window.addEventListener("online", function () {
    setIsOnline(true);
  });

  const changingHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFiles(selected);
      setError("");
    } else {
      setFiles(null);
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
    setFiles(null);
    setError(null);
    props.setUpdateModal(false);
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
    props.setUpdateModal(false);
    CloseSound();
  }

  // function for getting status of work
  function getStatus(input) {
    switch (input) {
      case t("modal_active"):
        return 1;
      case t("modal_done"):
        return 2;
      case t("modal_inDevelopment"):
        return 3;
      default:
        return "O- o";
    }
  }

  const PushToFirebase = () => {
    if (!files) {
      projectFirestore.collection("works").doc(props.dataForEdit[5]).update({
        name: workName,
        techs: workFramework,
        status: workStatus,
        workUrl: workUrl,
      });
      setReady(!ready);
      props.setUpdateModal(false);
    }
  };

  function UpdateDone() {
    setUpdateReady(false);
    setLogoUrl("");
    setReady(false);
    props.setUpdateModal(false);
  }

  useEffect(() => {
    if (updateReady === true) {
      projectFirestore.collection("works").doc(props.dataForEdit[5]).update({
        name: workName,
        techs: workFramework,
        status: workStatus,
        workUrl: workUrl,
        url: logoUrl,
      });
      UpdateDone();
    }
  }, [updateReady]);

  const GetData = () => {
    setWorkName(props.dataForEdit[0]);
    setWorkFramework(props.dataForEdit[1]);
    setWorkUrl(props.dataForEdit[2]);
    setWorkSelectedStatus(props.dataForEdit[3]);
    setWorkStatus(getStatus(props.dataForEdit[3]));
  };

  useEffect(() => {
    if (props.updateModal === true) {
      GetData();
    }
  }, [props.updateModal]);

  useEffect(() => {
    if (ready === false) {
      setReady(false);
    }
    if (ready === true) {
      PushToFirebase();
    }
  }, [ready]);

  return (
    <div
      ref={box}
      style={
        props.updateModal
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
        <h3 className={style.header}>{t("update_header")}</h3>
        <div className={style.workProperties}>
          <div className={style.addIcon}>
            <FiEdit />
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
              name="files"
              id="files"
              type="file"
              onChange={changingHandler}
              ref={logoInputs}
            />
            <label htmlFor="files">+</label>
            <input
              onClick={pushData}
              className={style.submit}
              type="submit"
              value={t("update_button")}
            />
            {ready && files && (
              <UpdateBar
                file={files}
                setReady={setReady}
                setUpdateReady={setUpdateReady}
                setLogoUrl={setLogoUrl}
              />
            )}
            <div className={style.notificationArea}>
              {files && (
                <div className={style.fileName}>
                  {t("modal_pickedFile") + files.name}
                </div>
              )}
              {error && <div className={style.error}>{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateModal;
