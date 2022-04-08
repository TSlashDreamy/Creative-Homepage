import style from "./downloadButton.module.css";
import { BsCloudDownload } from "react-icons/bs";
import { Howl } from "howler";
import { LinkClickSound } from "../../../../../soundConstants";

const DownloadButton = (props) => {
  function openInNewTab(url) {
    window.open(url, "_blank").focus();
  }

  const ClickOnLink = () => {
    const SoundLinkClick = new Howl({
      src: [LinkClickSound],
      volume: 0.7,
    });
    SoundLinkClick.play();
    openInNewTab(props.url);
  };

  return (
    <div onClick={ClickOnLink} className={style.button}>
      <span className={style.buttonContent}>{props.name}</span>
      <BsCloudDownload className={style.icon} />
    </div>
  );
};

export default DownloadButton;
