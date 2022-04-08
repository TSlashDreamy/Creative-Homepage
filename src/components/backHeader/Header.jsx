import AOS from "aos";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import header from "./header.module.css";
import Logo from "./logo/Logo";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineKey } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import { MdKeyboardBackspace } from "react-icons/md";
import Language from "../language/Language";
import { Howl } from "howler";
import {
  MenuInSound,
  MenuOutSound,
  ClickSound,
  LinkClickSound,
  LinkHoverSound,
} from "../../soundConstants";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  let [checked, setChecked] = useState(false);
  const [opacity, setOpacity] = useState(false);
  const { user, logout } = useAuth();

  const SoundMenuIn = new Howl({
    src: [MenuInSound],
    volume: 0.8,
  });

  const SoundMenuOut = new Howl({
    src: [MenuOutSound],
    volume: 0.8,
  });

  const SoundClick = new Howl({
    src: [ClickSound],
    volume: 0.7,
  });

  const HoverOnLink = () => {
    const LinkOnHover = new Howl({
      src: [LinkHoverSound],
      volume: 0.7,
    });
    LinkOnHover.play();
  };

  const ClickOnLink = () => {
    const SoundLinkClick = new Howl({
      src: [LinkClickSound],
      volume: 0.7,
    });
    SoundLinkClick.play();
  };

  const showMenu = () => {
    setChecked(!checked);
    PlaySound();
  };

  const returnHome = () => {
    if (checked === true) {
      PlaySound();
    }
    SoundClick.play();
    setChecked(false);
  };

  const PlaySound = () => {
    if (checked === true) {
      SoundMenuIn.play();
    } else if (checked === false) {
      SoundMenuOut.play();
    }
  };

  let { t } = useTranslation();
  useEffect(() => {
    AOS.init({
      delay: 150, // values from 0 to 3000, with step 50ms
      duration: 400,
      easing: "ease-in-out",
    });
  });

  function LogOut() {
    ClickOnLink();
    setOpacity(true);
    setTimeout(function () {
      logout();
      setOpacity(false);
    }, 700);
  }

  return (
    <header data-aos="fade-down" data-aos-delay="200">
      <div className={header.container}>
        <nav>
          <ul className={header.navList}>
            <li>
              <Link
                onMouseOver={HoverOnLink}
                onClick={ClickOnLink}
                to="/"
                className={header.navLinks}
              >
                <MdKeyboardBackspace className={header.viewArrow} />
                {t("backHeader")}
              </Link>
            </li>
          </ul>
        </nav>

        <Logo />
        {/* Mobile */}
        <input
          onChange={showMenu}
          className={header.checkBox}
          type="checkbox"
          checked={checked}
        />
        <div className={header.hamburgerMenu}>
          <span className={header.firstLine}></span>
          <span className={header.secondLine}></span>
          <span className={header.thirdLine}></span>
        </div>
        <div
          style={checked ? { top: "10vh" } : { top: "100vh" }}
          className={header.navMenu}
        >
          <h2 className={header.menuHeader}>{t("menu")}</h2>
          <ul
            style={opacity ? { opacity: 0 } : { opacity: 1 }}
            className={header.mobileNavList}
          >
            <li>
              <a
                onClick={returnHome}
                className={header.mobileNavLinks}
                href="https://github.com/TSlashDreamy"
              >
                GitHub
              </a>
            </li>
            <li>
              <Link to="/">
                <span onClick={returnHome} className={header.mobileNavLinks}>
                  {t("home")}
                </span>
              </Link>
            </li>
            <li className={header.mobileLogIcon}>
              {user ? (
                <span className={header.mobileNavLinks} onClick={LogOut}>
                  <FiLogOut />
                </span>
              ) : (
                <Link to="/login">
                  <span className={header.mobileNavLinks} onClick={ClickOnLink}>
                    <HiOutlineKey />
                  </span>
                </Link>
              )}
            </li>
          </ul>
          <Language text="1em" />
        </div>
      </div>
    </header>
  );
};

export default Header;
