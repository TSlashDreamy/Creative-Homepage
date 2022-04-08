import SliderArrows from "../../../sliderArrows/SliderArrows";
import WorksDescription from "../worksDescription/WorksDescription";
import WorksSlider from "../worksSlider/WorksSlider";
import style from "./worksContent.module.css";

const WorksContent = () => {
  return (
    <section id="myWorks">
      <div className={style.myWorksWrapper}>
        <WorksDescription />
        <WorksSlider />
      </div>
      <SliderArrows />
    </section>
  );
};

export default WorksContent;
