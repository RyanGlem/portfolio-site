import { FC } from "react";
import { useState } from "react";
import giphy from "./assets/videos/giphy-preview.mp4";
import experiments from "./assets/videos/experiment-preview.mp4";
import growth from "./assets/videos/growthrunner-preview.mp4";
import paper from "./assets/videos/paperwar-preview.mp4";
import tiles from "./assets/videos/tiles-preview.mp4";
import prev from "./assets/svg/prevarrow.svg"
import next from "./assets/svg/nextarrow.svg"
import expand from './assets/svg/expandarrow.svg'
import "./styles/slider.scss";

// Sending CSS Properties inside of a style variable
const Slide: FC<{link:string; video: string; onPlay(): void; onPause(): void; }> = ({
  video,
  link,
  onPlay,
  onPause,
}) => {

  return (
    <div className="slide" onMouseEnter={onPlay} onMouseLeave={onPause}>
      <a href={link} target="_blank">
        <video
          className="slide-video"
          loop
          preload="auto"
          muted
        >

          <source src={video} type="video/mp4"/>
        </video>
      </a>
    </div>
  );
};

// What the Carousel component controls is which slide is displayed
// Acess an array of Slies components
export const Carousel = () => {
  const [slideIndex, setIndex] = useState(0);
  const [vHeight, setVHeight] = useState ("0")
  const [isVisible, setVisible] = useState(true)

  
  const titles = ["Tiles.io", "giphyApp", "Experimentals", " Growth Runner", "Plane War"]
  const descriptions = 
  [
    "Color matching puzzle game where the objective is to get all tiles the same color built with Node.js, TypeScript, HMTL5, and SASS built in 8 hours.", 
    "Creation of a web application in the same vein of Tenor in which you must enter in search terms to acquire the most popular gifs circulated on the internet. Used asynchronous methods in order to load the API data with ReactJS to dynamically displays GIFs on the page",
    "Website made in Next.js and host on Vercel to test recursive rendering, collision detection, and SSR",
    "Educational Unity trivia game made in 2020 that has topics in mathematics, geography, and science",
    "Indepdent Unity made in 2020 to test projectiles and AI controllers"
  ]

  // The content will be a video of the project I was working on
  const contents : {video: string, link:string}[] = [
    {video: tiles+"#t=8,30", link: "https://tilesio.netlify.app"}, 
    {video: giphy, link: "https://giphsearch.netlify.app"}, 
    {video: experiments, link:"https://portfolio-website-weld-one.vercel.app"}, 
    {video: growth, link:"https://ruancy.itch.io/growthrunner"}, 
    {video: paper, link: "https://ruancy.itch.io/glemaud-ryan-plane-war"}
];

  // Keeping this commented because it's a cool way to populate an array with React components
  // const slides = Array.from({length : 4}, (_, i ) => (<Slide title={`${i}`}/>))
  const expandDescription = () => {
      vHeight === "0" ? setVHeight("100vh") : setVHeight("0")
  }

  const previousSlide = () => {
    setIndex((prevIndex) =>
      prevIndex <= 0 ? contents.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setIndex((nextIndex) =>
      nextIndex === contents.length - 1 ? 0 : nextIndex + 1
    );
  };

  const pause = () => {
    let slides = document.getElementsByClassName("slide-video");
    let vids = [...slides];
    vids.forEach((element) => {
      let control = element as HTMLVideoElement;
      control.pause();
      control.currentTime = 8;
    });
  };

  const play = () => {
    let slides = document.getElementsByClassName("slide-video");
    let vids = [...slides];
    vids.forEach((element) => {
      let control = element as HTMLVideoElement;
      let playPromise = control.play();

      if (playPromise !== undefined) {
        playPromise.then(_ => {
          control.play()
        })
        .catch (error => {
          console.log (error)
        })
      }
    });
  };

  return (
    <>
      <div className="carousel">
        <button onClick={previousSlide} id="prev"> 
            <img src={prev}/> 
        </button>
        <button onClick={nextSlide} id="next"> 
           <img src={next}/>
        </button>
        <button id ="expand" onClick={expandDescription}>
          <img src={expand}/>
      </button>
      <div className="vignette" style={{height: vHeight, visibility: vHeight === "0" ? "hidden" : "visible"}}>
        <div className="description"> <div id="title">{titles[slideIndex]}</div> {descriptions[slideIndex]} </div>
      </div>
        <div
          className="carouselSlider"
          style={{ transform: `translate3d(${-slideIndex * 100}%, 0, 0)` }}
        >
          {" "}
          {/* You can manipulate any JSX style property dynamically with style={{prop:value}} */}
          {contents.map((resource, index) => (
            <Slide 
              video={resource.video}
              onPlay={play} 
              onPause={pause} 
              key={index} 
              link={resource.link} 
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Carousel;
