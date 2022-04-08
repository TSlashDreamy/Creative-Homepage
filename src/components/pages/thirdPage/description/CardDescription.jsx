import style from "./carddesc.module.css";

const CardDescription = (props) => {
  return (
    <div className={style.cardDescription}>
      <h2 className={style.typeHeader}>{props.cardHeader}</h2>
      <p className={style.typeDescription}>{props.cardDescription}</p>
    </div>
  );
};

export default CardDescription;
