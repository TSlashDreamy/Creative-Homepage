import { useEffect } from "react";
import SkillsSlider from "../skillsSlider/SkillsSlider";
import style from "./skillsContent.module.css";
import BackHeader from "../../../../backHeader/Header";

const SkillsContent = () => {
  let cardsCount = 0;
  let maxCards = 0;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  return (
    <section id="myWorks">
      <div className={style.myWorksWrapper}>
        <BackHeader />
        <SkillsSlider cardsCount={cardsCount} maxCards={maxCards} />
      </div>
    </section>
  );
};

export default SkillsContent;
