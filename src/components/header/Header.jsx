import { useState } from "react";
import header from "./header.module.css";
import Logo from "./logo/Logo";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineKey } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import Language from "../language/Language";
import { Howl } from "howler";
import {
  MenuInSound,
  MenuOutSound,
  ClickSound,
  LinkClickSound,
  HoverSound,
  LinkHoverSound,
} from "../../soundConstants";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  let [checked, setChecked] = useState(false);
  let [playing, setPlaying] = useState(false);
  const [opacity, setOpacity] = useState(false);

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
    onplay: function () {
      setPlaying(true);
    },
    onend: function () {
      setPlaying(false);
    },
  });

  const HoverOnLink = () => {
    const LinkOnHover = new Howl({
      src: [LinkHoverSound],
      volume: 0.7,
    });
    LinkOnHover.play();
  };

  const HoverFunc = () => {
    const HoverOn = new Howl({
      src: [HoverSound],
      volume: 0.4,
    });
    HoverOn.play();
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
      setChecked(false);
    } else {
      // clipping fix
      if (playing === false) {
        SoundClick.play();
      }
    }
  };

  const PlaySound = () => {
    if (checked === true) {
      SoundMenuIn.play();
    } else if (checked === false) {
      SoundMenuOut.play();
    }
  };

  let { t } = useTranslation();
  const { user, logout } = useAuth();

  function LogOut() {
    ClickOnLink();
    setOpacity(true);
    setTimeout(function () {
      logout();
      setOpacity(false);
    }, 700);
  }

  return (
    <header>
      {/* PC version */}
      <div
        style={opacity ? { opacity: 0 } : { opacity: 1 }}
        className={header.container}
      >
        <div
          style={{ marginRight: "auto" }}
          onClick={returnHome}
          onMouseOver={HoverFunc}
        >
          <Logo />
        </div>
        <nav>
          <ul className={header.navList}>
            <li>
              <a
                onClick={ClickOnLink}
                onMouseOver={HoverOnLink}
                className={header.navLinks}
                href="https://github.com/TSlashDreamy"
              >
                GitHub
              </a>
            </li>
            <li>
              <Link to="/branding">
                <p
                  onClick={ClickOnLink}
                  onMouseOver={HoverOnLink}
                  className={header.navLinks}
                >
                  {t("navbar_branding")}
                </p>
              </Link>
            </li>
            <li>
              <ScrollLink to="contacts">
                <p
                  onClick={ClickOnLink}
                  onMouseOver={HoverOnLink}
                  className={header.navLinks}
                >
                  {t("navbar_contacts")}
                </p>
              </ScrollLink>
            </li>
            <li className={header.logIcon}>
              {user ? (
                <span
                  className={header.navLinks}
                  onClick={LogOut}
                  onMouseOver={HoverOnLink}
                >
                  <FiLogOut />
                </span>
              ) : (
                <Link to="/login">
                  <span
                    className={header.navLinks}
                    onClick={ClickOnLink}
                    onMouseOver={HoverOnLink}
                  >
                    <HiOutlineKey />
                  </span>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile version */}
      <div className={header.mobileContainer}>
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
        <div onClick={returnHome} className={header.mobileLogo}>
          <Logo />
        </div>
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
              onClick={showMenu}
              className={header.mobileNavLinks}
              href="https://github.com/TSlashDreamy"
            >
              GitHub
            </a>
          </li>
          <li>
            <Link to="/branding">
              <span onClick={showMenu} className={header.mobileNavLinks}>
                {t("navbar_branding")}
              </span>
            </Link>
          </li>
          <li>
            <ScrollLink to="contacts">
              <span onClick={showMenu} className={header.mobileNavLinks}>
                {t("navbar_contacts")}
              </span>
            </ScrollLink>
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
        <Language text="1.4em" />
      </div>
    </header>
  );
};

export default Header;
