import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
import style from "./contactLinks.module.css";
import { BsDiscord, BsInstagram, BsTwitter, BsTelegram } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";
import { FaVk } from "react-icons/fa";
import Button from "./buttons/Button";
import { useTranslation } from "react-i18next";

const ContactLinks = (props) => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      delay: 150, // values from 0 to 3000, with step 50ms
      duration: 400,
      easing: "ease-in-out",
    });
  });
  return (
    <div className={style.socialsWrapper}>
      <div data-aos="fade-down" data-aos-delay="180" className={style.socials}>
        <div className={style.headerWrapper}>
          <p className={style.socialsHeader}>{t("contacts_socials_header")}</p>
        </div>
        <div className={style.buttonsWrapper}>
          <Button
            link="https://vk.com/tslashdream"
            name="VK"
            icon={[<FaVk key="VK" className={style.icon} />]}
          />
          <Button
            link="https://twitter.com/TSlash_"
            name="Twitter"
            icon={[<BsTwitter key="Twitter" className={style.icon} />]}
          />
          <Button
            link="https://www.instagram.com/tslash_dreamy/"
            name="Instagram"
            icon={[<BsInstagram key="Instagram" className={style.icon} />]}
          />
        </div>
      </div>
      <div data-aos="fade-down" data-aos-delay="190" className={style.socials}>
        <div className={style.headerWrapper}>
          <p className={style.socialsHeader}>
            {t("contacts_messangers_header")}
          </p>
        </div>
        <div className={style.buttonsWrapper}>
          <Button
            link="https://discordapp.com/users/429950919296155650/"
            name="Discord"
            icon={[<BsDiscord key="Discord" className={style.icon} />]}
          />
          <Button
            link="https://t.me/TSlash_T"
            name="Telegram"
            icon={[<BsTelegram key="Telegram" className={style.icon} />]}
          />
        </div>
      </div>
      <div data-aos="fade-down" data-aos-delay="200" className={style.socials}>
        <div className={style.headerWrapper}>
          <p className={style.socialsHeader}>{t("contacts_emails_header")}</p>
        </div>
        <div className={style.buttonsWrapper}>
          <Button
            link="mailto:tslashdreamy@gmail.com"
            name="Email"
            icon={[<MdAlternateEmail key="Email" className={style.icon} />]}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactLinks;
