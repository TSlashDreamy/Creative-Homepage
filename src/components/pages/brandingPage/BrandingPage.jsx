import { useEffect } from "react";
import BackHeader from "../../backHeader/Header";
import TypographyPage from "./typographyPage/TypographyPage";
import ColorPage from "./colorPage/ColorPage";
import DownloadPage from "./downloadPage/DownloadPage";

const BrandingPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  return (
    <>
      <BackHeader />
      <TypographyPage />
      <ColorPage />
      <DownloadPage />
    </>
  );
};

export default BrandingPage;
