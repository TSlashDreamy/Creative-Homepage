import style from "./worksCard.module.css";
import { MdKeyboardBackspace } from "react-icons/md";
import { useState, useRef } from "react";
import {
  MdOutlineDelete,
  MdOutlineEdit,
  MdExpandMore,
  MdOutlineClose,
} from "react-icons/md";
import { Howl } from "howler";
import {
  HoverSound,
  ClickSound,
  LinkClickSound,
} from "../../../../soundConstants";
import { useAuth } from "../../../../hooks/useAuth";

const WorksCard = (props) => {
  const { user } = useAuth();

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

  const EditMenuOpened = () => {
    const EditSound = new Howl({
      src: [LinkClickSound],
      volume: 0.7,
    });
    EditSound.play();
  };
  const backgrounds = useRef(0);
  const [menuIsShowed, setMenuIsShowed] = useState(false);

  function ShowEditMenu() {
    if (!user) {
      return;
    }
    EditMenuOpened();
    setMenuIsShowed(!menuIsShowed);
  }

  function ShowUpdateMenu() {
    ClickSoundTriggered();
    props.setUpdateModal(true);
    props.setDataForEdit([
      props.name,
      props.tech,
      props.workUrl,
      props.status,
      props.selectedUrl,
      props.id,
    ]);
  }

  function ChangeBackRed() {
    HoverTriggered();
    backgrounds.current.style.background =
      "linear-gradient(135deg, #ed5e6815, #ed5e6823)";
  }

  function ChangeBackWhite() {
    HoverTriggered();
    backgrounds.current.style.background =
      "linear-gradient(135deg, #f0f0f007, #f0f0f011)";
  }

  function ClearStyle() {
    backgrounds.current.style.background =
      "linear-gradient(135deg, #48311815, #48311815)";
  }

  function OpenConfirm() {
    ClickSoundTriggered();
    props.setConfirm(true);
    props.setSelectedUrl(props.logo);
    props.setSelectedId(props.id);
  }

  return (
    <div onDoubleClick={ShowEditMenu} className={style.workCard}>
      {/* edit menu */}
      {user && (
        <div
          ref={backgrounds}
          style={
            menuIsShowed
              ? {
                  opacity: 1,
                  transform: "scale(1)",
                  background: "linear-gradient(135deg, #48311815, #48311815)",
                }
              : { opacity: 0, transform: "scale(0)" }
          }
          className={style.editMenu}
        >
          <div onClick={ShowEditMenu} className={style.closeBtn}>
            <MdOutlineClose />
          </div>
          <button
            onMouseOver={ChangeBackRed}
            onMouseLeave={ClearStyle}
            onClick={OpenConfirm}
            className={`${style.editMenuButton} ${style.deleteButton}`}
          >
            <MdOutlineDelete />
          </button>
          <button
            onMouseOver={ChangeBackWhite}
            onMouseLeave={ClearStyle}
            onClick={ShowUpdateMenu}
            className={`${style.editMenuButton} ${style.editButton}`}
          >
            <MdOutlineEdit />
          </button>
        </div>
      )}
      {/* card */}
      <div
        className={`${
          menuIsShowed ? style.unactiveBackground : style.cardBackground
        }  `}
      ></div>
      <div
        style={
          menuIsShowed
            ? { opacity: 0, transform: "scale(0)" }
            : { opacity: 1, transform: "scale(1)" }
        }
        className={style.dateAndLogo}
      >
        <p className={style.date}>{props.date}</p>
        <img src={props.logo} alt="work logo" className={style.logo} />
      </div>
      <div
        style={
          menuIsShowed
            ? { opacity: 0, transform: "scale(0)" }
            : { opacity: 1, transform: "scale(1)" }
        }
        className={style.status}
      >
        <span>{props.status}</span>
        {user && (
          <div onClick={ShowEditMenu} className={style.mobileOption}>
            <MdExpandMore />
          </div>
        )}
      </div>
      <div
        style={
          menuIsShowed
            ? { opacity: 0, transform: "scale(0)" }
            : { opacity: 1, transform: "scale(1)" }
        }
        className={style.workName}
      >
        {props.name}
      </div>
      <div
        style={
          menuIsShowed
            ? { opacity: 0, transform: "scale(0)" }
            : { opacity: 1, transform: "scale(1)" }
        }
        className={style.cardFooter}
      >
        <div className={style.usedTech}>
          <span>{props.tech}</span>
        </div>
        <a href={props.workUrl}>
          <MdKeyboardBackspace className={style.viewArrow} />
        </a>
      </div>
    </div>
  );
};

export default WorksCard;
