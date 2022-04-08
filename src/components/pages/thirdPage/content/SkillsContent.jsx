import Card from "../card/Card";
import SectionDescription from "../description/SectionDescription";
import style from "./skillscontent.module.css";
import cardStyle from "../card/card.module.css";
import { useTranslation } from "react-i18next";

const SkillsContent = () => {
  let { t } = useTranslation();

  return (
    <section id="mySkills">
      <div className={style.wrapper}>
        <SectionDescription />
        <div className={style.cardWrapper}>
          <Card
            skillType={cardStyle.square}
            cardHeader="Hard Skills"
            cardDescription={t("my_skills_hard_card_description")}
            type="/hardSkills"
          />
          <Card
            skillType={cardStyle.cirlce}
            cardHeader="Soft Skills"
            cardDescription={t("my_skills_soft_card_description")}
            type="/softSkills"
          />
        </div>
      </div>
    </section>
  );
};

export default SkillsContent;
