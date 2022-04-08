import AOS from "aos";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import SkillsCard from "../skillsCard/SkillsCard";
import style from "./skillsSlider.module.css";
import cardStyle from "../skillsCard/skillsCard.module.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import SliderArrows from "../../../../sliderArrows/SliderArrows";
import { Howl } from "howler";
import Modal from "../skillsModal/Modal";
import useFirestore from "../../../../../hooks/useFirestore";
import { useAuth } from "../../../../../hooks/useAuth";
import {
  LinkClickSound,
  HoverSound,
  ClickSound,
} from "../../../../../soundConstants";
let counted = false;

const SkillsSlider = (props) => {
  let { t } = useTranslation();
  const { docs } = useFirestore("hardSkills");
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
      volume: 0.7,
    });
    HoveredSound.play();
  };

  useEffect(() => {
    AOS.init({
      delay: 150, // values from 0 to 3000, with step 50ms
      duration: 400,
      easing: "ease-in-out",
    });
  });
  // Amount of works
  let slides;
  if (!user) {
    slides = docs.length;
  } else {
    slides = docs.length + 1;
  }

  function getCurrCards() {
    if (slides < 3) {
      return slides;
    } else {
      return 3;
    }
  }

  let currentCards = getCurrCards();
  let maxCards = slides;
  let [cardsCount, setCardsCount] = useState(currentCards);

  useEffect(() => {
    setCardsCount(getCurrCards);
  }, [docs]);

  // function for counting time (fixing overscroll problem)
  const decrementSeconds = () => {
    setTimeout(function () {
      counted = false;
    }, 600);
  };

  let [modal, setModal] = useState(false);

  function showModal() {
    AddWorkSound();
    setModal(!modal);
  }

  // percents formula for works
  const percents = Math.round((slides.length * 100) / 3);
  // current percents position
  let currentstate = percents;

  // change current percents
  const changeProgress = (action) => {
    if (action === "plus") {
      currentstate = currentstate + percents;
      if (cardsCount !== maxCards) {
        setCardsCount(cardsCount + 1);
      }
    } else if (action === "minus") {
      currentstate = currentstate - percents;
      if (cardsCount !== currentCards) {
        setCardsCount(cardsCount - 1);
      }
    }
  };

  // function for checking scroll progress (turn on/off buttons )
  const checkProgress = (action) => {
    let left = document.getElementById("left");
    let right = document.getElementById("right");
    if (action === currentCards) {
      left.style.opacity = "0";
      left.style.cursor = "default";
      left.style.pointerEvents = "none";
    } else {
      left.style.opacity = "1";
      left.style.cursor = "pointer";
      left.style.pointerEvents = "all";
    }
    if (action === maxCards) {
      right.style.opacity = "0";
      right.style.cursor = "default";
      right.style.pointerEvents = "none";
    } else {
      right.style.opacity = "1";
      right.style.cursor = "pointer";
      right.style.pointerEvents = "all";
    }
  };
  // function for left button (scroll works left)
  const slideLeft = () => {
    if (counted === false) {
      counted = true;
      decrementSeconds();
      ClickOnLink();
      changeProgress("minus");
      checkProgress(cardsCount - 1);
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
    } else {
      return;
    }
  };

  // function for right button (scroll works right)
  const slideRight = () => {
    if (counted === false) {
      counted = true;
      decrementSeconds();
      ClickOnLink();
      changeProgress("plus");
      checkProgress(cardsCount + 1);
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
    } else {
      return;
    }
  };

  // oh god, i know, this is terrible, but i don't have any choise ;-;
  function TranslateTypes(data) {
    switch (data) {
      case "Markup Language":
        return t("hardskills_markup");
      case "Styling Language":
        return t("hardskills_styling");
      case "Programming Language":
        return t("hardskills_programming");
      case "JS Runtime":
        return t("hardskills_progPlatform");
      case "JS Library":
        return t("hardskills_jsLib");
      case "Framework":
        return t("hardskills_framework");
      case "Cloud Base":
        return t("hardskills_cloud");
      case "Version Control System":
        return t("hardskills_verControl");
      case "IDE":
        return t("hardskills_IDE");
      case "Design Utilities":
        return t("hardskills_desUtilities");
      default:
        return data;
    }
  }

  // styles for cards
  let cardStylesArray = [
    cardStyle.redCircle,
    cardStyle.blueSquare,
    cardStyle.greenCircle,
    cardStyle.sweetTriangle,
    cardStyle.purpleHexagon,
    cardStyle.blueDiamond,
    cardStyle.orangeCross,
    cardStyle.yellowCircle,
    cardStyle.yellowArrow,
    cardStyle.regRhomb,
  ];

  let variant = -1;
  function getCardStyle() {
    if (variant > 8) {
      variant = -1;
    }
    variant++;
    return cardStylesArray[variant];
  }

  return (
    <>
      {user && <Modal modal={modal} setModal={setModal} />}
      <div className={style.textWrapper}>
        {/* WORK TYPE */}
        <h2
          data-aos="fade-down"
          data-aos-delay="200"
          className={style.worksType}
        >
          Hard Skills
        </h2>
        <div className={style.typeWrapper}>
          <p data-aos="fade-down" data-aos-delay="200" className={style.type}>
            <span className={style.mobileCards}>{maxCards}</span> {t("cards")}{" "}
            <span className={style.pcCards}>
              {cardsCount}/{maxCards}
            </span>
          </p>
        </div>
      </div>
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
              <div className={`${cardStyle.workCard} ${cardStyle.addCard}`}>
                <div className={cardStyle.cardContent}>
                  <button
                    onMouseOver={HoverOnPlus}
                    onClick={showModal}
                    className={cardStyle.addBtn}
                  >
                    {t("cards_add")}
                  </button>
                  <p className={cardStyle.type}>{t("cards_learned")}</p>
                </div>
              </div>
            </div>
          )}
          {docs ? (
            docs.map((doc) => {
              return (
                <div id="card" key={doc.id} className={style.card}>
                  <SkillsCard
                    name={doc.name}
                    type={TranslateTypes(doc.type)}
                    link={doc.url}
                    cardStyle={getCardStyle()}
                  />
                </div>
              );
            })
          ) : (
            <h2>Wow, looks like we have a problem's here ;-;</h2>
          )}
        </div>

        <MdKeyboardArrowRight
          size={40}
          className={`${style.sliderIcon} ${style.right}`}
          id="right"
          onClick={slideRight}
        />
      </div>
      <SliderArrows />
    </>
  );
};

export default SkillsSlider;
