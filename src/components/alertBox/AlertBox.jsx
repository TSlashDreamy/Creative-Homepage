import style from "./alertBox.module.css";
import { useState } from "react";
import { MdSignalWifiOff } from "react-icons/md";

const AlertBox = () => {
  let [isOnline, setIsOnline] = useState(true);

  window.addEventListener("offline", function () {
    setIsOnline(false);
  });

  window.addEventListener("online", function () {
    setIsOnline(true);
  });
  return (
    <div
      style={isOnline ? { opacity: 0, zIndex: 0 } : { opacity: 1 }}
      className={`${style.box} ${isOnline ? "" : `${style.blink}`}`}
    >
      <MdSignalWifiOff />
    </div>
  );
};

export default AlertBox;
