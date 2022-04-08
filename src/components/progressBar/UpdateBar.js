import style from "./progressBar.module.css";
import useUpdateStorage from "../../hooks/useUpdateStorage";
import { useEffect } from "react";

import React from "react";

function UpdateBar({ file, setReady, setUpdateReady, setLogoUrl }) {
  const { url, progress } = useUpdateStorage(file);

  useEffect(() => {
    if (url) {
      setLogoUrl(url);
      setUpdateReady(true);
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

export default UpdateBar;
