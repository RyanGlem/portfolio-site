import "./styles/header.scss";
import logo from "./assets/github logo.jpeg";
import gear from "./assets/svg/gear.svg";
import { useState, useEffect, FC } from "react";

export const Header: FC<{ scroll: number }> = ({ scroll }) => {
  let headerName = " RYAN GLEMAUD";
  let headerHeight = 0;
  let [header, setHeader] = useState("");
  let [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setTimeout(typewriter, 115);
    headerHeight = document
      .querySelector(".header-container")
      ?.getBoundingClientRect().top as number;
    if (index >= headerName.length) clearInterval(interval);
  });

  const typewriter = () => {
    if (index < headerName.length) {
      setHeader((header += headerName.charAt(index)));
    }
    setIndex((index += 1));
  };

  let gearIcon = document.getElementById("gearsvg") as HTMLElement;

  let deg = 0;

  gearIcon?.addEventListener("mouseenter", () => {
    let interval = setInterval(() => {
      deg += 15;
      gearIcon.style.transform = `rotate(${deg}deg)`;
    }, 100);

    gearIcon?.addEventListener("mouseleave", () => {
      clearInterval(interval)
    })
  });

  

  return (
    <>
      <div className="header-container">
        <a href="mailto:ryanglem@hotmail.com">
          <img
            src={gear}
            style={{ transform: `rotate(${scroll}deg)` }}
            id="gearsvg"
          />
        </a>
        <a href="https://github.com/RyanGlem" target="_blank">
          <img src={logo} id="gitlogo" />
        </a>
        <div className="header" id="App">
          {" "}
          <a
            href="https://www.linkedin.com/in/ryan-glemaud-56772b168/"
            target="_blank"
          >
            {header}
          </a>
          <p>Software Engineer</p>
        </div>
      </div>
    </>
  );
};

export default Header;
