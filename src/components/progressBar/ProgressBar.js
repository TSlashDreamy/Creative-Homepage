import style from "./progressBar.module.css";
import useStorage from "../../hooks/useStorage";
import { useEffect } from "react";

import React from "react";

function ProgressBar({ file, name, status, tech, workUrl, setReady }) {
  const { url, progress } = useStorage(file, name, status, tech, workUrl);

  useEffect(() => {
    if (url) {
      setReady(false);
    }
  }, [url, setReady]);

  return (
    <div className={style.progressBarBackground}>
      <div
        style={{ width: progress + "%" }}
        className={style.progressBar}
      ></div>
    </div>
  );
}

export default ProgressBar;
