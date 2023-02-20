import { Carousel } from "./carousel";
import { Header } from "./header";
import { Contact } from "./contact";
import { useState, FC } from "react";
import react_logo from "./assets/svg/react.svg";
import mongodb_logo from "./assets/svg/MongoDBlogo.svg";
import js_logo from "./assets/svg/jslogo.svg";
import ts_logo from "./assets/svg/tslogo.svg";
import postgresql_logo from "./assets/svg/PostgreSQL_logo.svg";
import node_logo from "./assets/svg/nodejslogo.svg";
import express_logo from "./assets/svg/express.svg";
import sass_logo from "./assets/svg/sass.svg";
import "./styles/app.scss";

const Skills: FC<{ scroll: number }> = ({ scroll }) => {
  return (
    <div className="skills-section" style={{ padding: `${scroll}` }}>
      <p className="skills-header">PRIMARY TOOLS</p>
      <img
        src={react_logo}
        style={{ transform: `rotate(${scroll}deg)` }}
        id="skill-svg"
      />
      <img src={mongodb_logo} id="skill-svg" />
      <img src={js_logo} id="skill-svg" />
      <img src={ts_logo} id="skill-svg" />
      <img src={postgresql_logo} id="skill-svg" />
      <img src={node_logo} id="skill-svg" />
      <img src={express_logo} id="skill-svg" />
      <img src={sass_logo} id="skill-svg" />
    </div>
  );
};

const App = () => {
  let [scrollOffset, setOffset] = useState(0);
  let [visible, setVisible] = useState(false);

  let gear = document.getElementById("gearsvg") as HTMLElement;

  gear?.addEventListener("click", () => {
    setVisible(!visible);
    let deg = 180;
    gear.style.transform = `rotate(${deg}deg)`;
  });

  // You can access regular window, document, and eventListeners in the document
  window.addEventListener("scroll", () => {
    setOffset((offset) => (offset = window.scrollY));
  });

  return (
    <>
      <Header scroll={scrollOffset} />
      {visible ? (
        <Contact />
      ) : (
        <>
          <Carousel />
          <Skills scroll={scrollOffset} />
          <div className="about-section">
            Welcome, if you stumbled across this site you're either lost or
            interested in what I do. I'm an aspiring software engineer that
            specializes in developing web applications primarily in TypeScript,
            NodeJS and ReactJS. I have a soft spot for animations, graphics
            rendering, and physics engines. If you like what you see, stick
            around. There is definitely more to come.
          </div>
        </>
      )}
    </>
  );
};

export default App;
