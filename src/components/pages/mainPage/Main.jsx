import React, { useEffect } from "react";
import Language from "../../language/Language";
import Header from "../../header/Header";
import PageIndicator from "../../pageIndicator/PageIndicator";
import Content from "../firstPage/content/Content";
import AboutMeContent from "../secondPage/aboutMeContent/AboutMeContent";
import SkillsContent from "../thirdPage/content/SkillsContent";
import WorksContent from "../fourthPage/worksContent/WorksContent";
import ContactCard from "../fivethPage/contactCard/ContactCard";

const Main = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  return (
    <>
      <div className="adaptiveLang">
        <Language />
      </div>
      <Header />
      <PageIndicator />

      <Content />
      <AboutMeContent />
      <SkillsContent />
      <WorksContent />
      <ContactCard />
    </>
  );
};

export default Main;
