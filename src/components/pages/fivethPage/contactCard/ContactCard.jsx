import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
import style from "./contactCard.module.css";
import ContactText from "../contactText/ContactText";
import ContactLinks from "../contactLinks/ContactLinks";

const ContactCard = () => {
  useEffect(() => {
    AOS.init({
      delay: 150, // values from 0 to 3000, with step 50ms
      duration: 400,
      easing: "ease-in-out",
    });
  });
  return (
    <section id="contacts">
      <div data-aos="fade-down" className={style.contactsCard}>
        <ContactText />
        <ContactLinks />
        <p
          data-aos="fade-down"
          data-aos-delay="170"
          className={style.waterMark}
        >
          ©️ Copyright 2022 | /TSlash
        </p>
      </div>
    </section>
  );
};

export default ContactCard;
