import AOS from "aos";
import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import WorksCard from "../worksCard/WorksCard";
import style from "./worksSlider.module.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Howl } from "howler";
import { useTranslation } from "react-i18next";
import {
  LinkClickSound,
  HoverSound,
  ClickSound,
  ErrorSound,
} from "../../../../soundConstants";
import Modal from "../../../modal/Modal";
import useFirestore from "../../../../hooks/useFirestore";
import ConfirmBox from "../../../confirmationBox/ConfirmBox";
import UpdateModal from "../../../updateModal/UpdateModal";
import { useAuth } from "../../../../hooks/useAuth";

const WorksSlider = (props) => {
  const { user } = useAuth();

  const ClickOnLink = () => {
    const SoundLinkClick = new Howl({
      src: [LinkClickSound],
      volume: 0.7,
    });
    SoundLinkClick.play();
  };

  const AddWorkSound = () => {
    const AddClicked = new Howl({
      src: [ClickSound],
      volume: 0.7,
    });
    AddClicked.play();
  };

  const HoverOnPlus = () => {
    const HoveredSound = new Howl({
      src: [HoverSound],
      volume: 0.5,
    });
    HoveredSound.play();
  };

  const ErrorTrigger = () => {
    const ErrorPlay = new Howl({
      src: [ErrorSound],
      volume: 0.7,
    });
    ErrorPlay.play();
  };

  const { docs } = useFirestore("works");
  let { t } = useTranslation();
  useEffect(() => {
    AOS.init({
      delay: 150, // values from 0 to 3000, with step 50ms
      duration: 400,
      easing: "ease-in-out",
    });
  });

  let [modal, setModal] = useState(false);
  let [updateModal, setUpdateModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [selectedId, setSelectedId] = useState("");
  let [dataForEdit, setDataForEdit] = useState([]);

  function showModal() {
    setModal(!modal);
    if (modal === false) {
      AddWorkSound();
    } else {
      ErrorTrigger();
    }
  }

  // Amount of works
  let slides;
  function GetSlidesAmount() {
    if (!user) {
      return (slides = docs.length);
    } else {
      return (slides = docs.length + 1); // on admin login + 1
    }
  }
  GetSlidesAmount();
  useEffect(() => {
    GetSlidesAmount();
  });

  let alreadyCounting = false;

  // function for counting time
  const decrementSeconds = () => {
    setTimeout(function () {
      alreadyCounting = false;
    }, 600);
  };

  // percents formula for works
  const percents = Math.round((slides * 100) / 3);
  // current percents position
  let currentstate = percents;
  // minimum percents of works
  let min = percents;
  // maximum percents of works
  let max = percents * slides - percents * 2;
  // percentage for indicator
  const paginationPercentage = (min * 100) / max;
  // current percentage position of indicator
  let paginationStatus = paginationPercentage;

  // change current percents
  const changeProgress = (action) => {
    if (action === "plus") {
      currentstate = currentstate + percents;
    } else if (action === "minus") {
      currentstate = currentstate - percents;
    }
  };

  // hiding arrows when works < 3
  const HideArrows = () => {
    let left = document.getElementById("left");
    let right = document.getElementById("right");
    let pagination = document.getElementById("pagination");

    left.style.opacity = "0";
    left.style.cursor = "default";
    left.style.pointerEvents = "none";

    right.style.opacity = "0";
    right.style.cursor = "default";
    right.style.pointerEvents = "none";

    pagination.style.width = "100%";
  };

  // function for checking scroll progress (turn on/off buttons )
  const checkProgress = () => {
    let left = document.getElementById("left");
    if (Math.round(currentstate) === Math.round(min)) {
      left.style.opacity = "0";
      left.style.cursor = "default";
      left.style.pointerEvents = "none";
    } else {
      left.style.opacity = "1";
      left.style.cursor = "pointer";
      left.style.pointerEvents = "all";
    }

    let right = document.getElementById("right");
    if (Math.round(currentstate) === Math.round(max)) {
      right.style.opacity = "0";
      right.style.cursor = "default";
      right.style.pointerEvents = "none";
    } else {
      right.style.opacity = "1";
      right.style.cursor = "pointer";
      right.style.pointerEvents = "all";
    }
    if (docs.length < 3) {
      HideArrows();
    }
  };

  // function for left button (scroll works left)
  const slideLeft = () => {
    if (alreadyCounting === false) {
      alreadyCounting = true;
      decrementSeconds();
      ClickOnLink();
    } else {
      return;
    }
    let pagination = document.getElementById("pagination");
    checkProgress();
    var slider = document.getElementById("slider");
    var card = document.getElementById("card");
    slider.scrollLeft =
      slider.scrollLeft -
      (card.clientWidth +
        parseInt(
          (card.currentStyle || window.getComputedStyle(card)).marginRight
        ) +
        parseInt(
          (card.currentStyle || window.getComputedStyle(card)).marginLeft
        ));
    changeProgress("minus");
    paginationStatus = paginationStatus - paginationPercentage;
    pagination.style.width = paginationStatus + "%";
    checkProgress();
  };

  // function for right button (scroll works right)
  const slideRight = () => {
    if (alreadyCounting === false) {
      alreadyCounting = true;
      decrementSeconds();
      ClickOnLink();
    } else {
      return;
    }
    let pagination = document.getElementById("pagination");
    checkProgress();
    var slider = document.getElementById("slider");
    var card = document.getElementById("card");
    slider.scrollLeft =
      slider.scrollLeft +
      (card.clientWidth +
        parseInt(
          (card.currentStyle || window.getComputedStyle(card)).marginRight
        ) +
        parseInt(
          (card.currentStyle || window.getComputedStyle(card)).marginLeft
        ));
    changeProgress("plus");
    paginationStatus = paginationStatus + paginationPercentage;
    pagination.style.width = paginationStatus + "%";
    checkProgress();
  };

  // function for getting status of work
  function getStatus(input) {
    switch (input) {
      case 1:
        return t("modal_active");
      case 2:
        return t("modal_done");
      case 3:
        return t("modal_inDevelopment");
      default:
        return "O- o";
    }
  }

  return (
    <>
      {user && (
        <>
          <Modal modal={modal} setModal={setModal} />
          <UpdateModal
            updateModal={updateModal}
            setUpdateModal={setUpdateModal}
            dataForEdit={dataForEdit}
            setDataForEdit={setDataForEdit}
          />
          <ConfirmBox
            confirm={confirm}
            setConfirm={setConfirm}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            selectedUrl={selectedUrl}
            setSelectedUrl={setSelectedUrl}
          />
        </>
      )}

      <div
        data-aos="fade-down"
        data-aos-delay="250"
        className={style.mainSliderContainer}
      >
        <MdKeyboardArrowLeft
          size={40}
          className={`${style.sliderIcon} ${style.left}`}
          id="left"
          onClick={slideLeft}
        />
        <div id="slider" className={style.slider}>
          {user && (
            <div id="card" className={style.card}>
              <div className={style.workCard}>
                <div className={style.cardBackground}></div>
                <button
                  onMouseOver={HoverOnPlus}
                  onClick={showModal}
                  className={style.addButton}
                >
                  +
                </button>
              </div>
            </div>
          )}
          {docs ? (
            docs.map((doc) => {
              return (
                <div id="card" key={doc.id} className={style.card}>
                  <WorksCard
                    logo={doc.url}
                    date={
                      doc.createdAt
                        ? doc.createdAt.toDate().toLocaleDateString("en-US")
                        : t("firebase_creatingTimestamp")
                    }
                    status={
                      doc.status ? getStatus(doc.status) : t("firebase_loading")
                    }
                    name={doc.name ? doc.name : t("firebase_loading")}
                    tech={doc.techs ? doc.techs : t("firebase_loading")}
                    workUrl={doc.workUrl ? doc.workUrl : t("firebase_loading")}
                    setConfirm={setConfirm}
                    id={doc.id}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    setSelectedUrl={setSelectedUrl}
                    setUpdateModal={setUpdateModal}
                    dataForEdit={dataForEdit}
                    setDataForEdit={setDataForEdit}
                  />
                </div>
              );
            })
          ) : (
            <div id="card" className={style.card}>
              <div className={style.workCard}>
                <div className={style.cardBackground}></div>
                <h2>Wow, looks like we have a problem's here ;-;</h2>
              </div>
            </div>
          )}
        </div>

        <MdKeyboardArrowRight
          size={40}
          className={`${style.sliderIcon} ${style.right}`}
          id="right"
          onClick={slideRight}
        />
      </div>
      <div className={style.paginationWrapper}>
        <div className={style.paginationEmpty}></div>
        <div id="pagination" className={style.paginationFull}></div>
      </div>
    </>
  );
};

export default WorksSlider;
