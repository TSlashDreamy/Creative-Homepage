import logo from "./logo.module.css";

const Logo = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <svg
      onClick={scrollToTop}
      className={logo.logo}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 715.35 689.39"
    >
      <defs>
        <linearGradient id="cols1">
          <stop offset="0%" stopColor="#8942ad" />
          <stop offset="50%" stopColor="#ad426f" />
          <stop offset="100%" stopColor="#f52c2e" />
        </linearGradient>
        <linearGradient id="cols2">
          <stop offset="0%" stopColor="#ad426f" />
          <stop offset="100%" stopColor="#f52c2e" />
        </linearGradient>
        <linearGradient id="cols3">
          <stop offset="0%" stopColor="#f52c2e" />
          <stop offset="30%" stopColor="#f53a2c" />
          <stop offset="100%" stopColor="#fcc25b" />
        </linearGradient>
      </defs>
      <g id="Слой_2" data-name="Слой 2">
        <g id="Слой_1-2" data-name="Слой 1">
          <path
            className={logo.cls1}
            d="M402.69,217.43V453.06a249.42,249.42,0,0,1-14.23,83.28,247.8,247.8,0,0,1-17,37.69,250,250,0,0,1-32.41,45.59,246.67,246.67,0,0,1-19.67,19.67,249.39,249.39,0,0,1-72.8,45.41q-5.17,2.12-10.48,4V453.06a249.5,249.5,0,0,1,63.62-166.57,246.42,246.42,0,0,1,19.66-19.66,249.39,249.39,0,0,1,72.81-45.42Q397.39,219.3,402.69,217.43Z"
          />
          <path
            className={logo.cls1}
            d="M402.69,217.43V453.06a249.42,249.42,0,0,1-14.23,83.28,247.8,247.8,0,0,1-17,37.69,250,250,0,0,1-32.41,45.59,246.67,246.67,0,0,1-19.67,19.67,249.39,249.39,0,0,1-72.8,45.41q-5.17,2.12-10.48,4V453.06a249.5,249.5,0,0,1,63.62-166.57,246.42,246.42,0,0,1,19.66-19.66,249.39,249.39,0,0,1,72.81-45.42Q397.39,219.3,402.69,217.43Z"
          />
          <path
            className={logo.cls2}
            d="M714.85,1.25V167.82H405.16a287.37,287.37,0,0,1,13.07-37.68,259.54,259.54,0,0,1,25-45.6,227.58,227.58,0,0,1,15.14-19.67c16.39-19.06,35.33-34.51,56.06-45.41,1.86-1,4.69-2.43,8.07-4C551,2.37,575.94,1.58,591.1,1.25,621.43.61,663.6-.06,714.85,1.25Z"
          />
          <path
            className={logo.cls2}
            d="M714.85,1.25V167.82H405.16a287.37,287.37,0,0,1,13.07-37.68,259.54,259.54,0,0,1,25-45.6,227.58,227.58,0,0,1,15.14-19.67c16.39-19.06,35.33-34.51,56.06-45.41,1.86-1,4.69-2.43,8.07-4C551,2.37,575.94,1.58,591.1,1.25,621.43.61,663.6-.06,714.85,1.25Z"
          />
          <path
            className={logo.cls3}
            d="M.5,167.44V.88H402.69a247.25,247.25,0,0,1-17,37.68,249.68,249.68,0,0,1-32.41,45.6,244.89,244.89,0,0,1-19.67,19.66,249.21,249.21,0,0,1-72.8,45.42q-5.17,2.12-10.48,4a249.66,249.66,0,0,1-83.28,14.22Z"
          />
          <path
            className={logo.cls3}
            d="M.5,167.44V.88H402.69a247.25,247.25,0,0,1-17,37.68,249.68,249.68,0,0,1-32.41,45.6,244.89,244.89,0,0,1-19.67,19.66,249.21,249.21,0,0,1-72.8,45.42q-5.17,2.12-10.48,4a249.66,249.66,0,0,1-83.28,14.22Z"
          />
        </g>
      </g>
    </svg>
  );
};

export default Logo;