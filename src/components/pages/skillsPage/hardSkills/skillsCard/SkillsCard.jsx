import style from "./skillsCard.module.css";

const SkillsCard = (props) => {
  return (
    <a href={props.link} target="_blank" rel="noreferrer">
      <div className={`${style.workCard} ${props.cardStyle}`}>
        <div className={style.cardContent}>
          <h2 className={style.description}>{props.name}</h2>
          <p className={style.type}>{props.type}</p>
        </div>
      </div>
    </a>
  );
};

export default SkillsCard;
