import { FC } from "react";
import { useState } from "react";
import giphy from "./assets/videos/giphy-preview.mp4";
import experiments from "./assets/videos/experiment-preview.mp4";
import growth from "./assets/videos/growthrunner-preview.mp4";
import paper from "./assets/videos/paperwar-preview.mp4";
import tiles from "./assets/videos/tiles-preview.mp4";
import prev from "./assets/svg/prevarrow.svg"
import next from "./assets/svg/nextarrow.svg"
import "./styles/slider.scss";

// Sending CSS Properties inside of a style variable
const Slide: FC<{link:string; video: string; onPlay(): void; onPause(): void }> = ({
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
          style={{ height: "90vh", width: "100%" }}
          loop
          preload="auto"
          muted
        >
          <source src={video + "#t=6,30"} type="video/mp4" />
        </video>
      </a>
    </div>
  );
};

// What the Carousel component controls is which slide is displayed
// Acess an array of Slies components
export const Carousel = () => {
  const [slideIndex, setIndex] = useState(0);

  // The content will be a video of the project I was working on
  const contents : {video: string, link:string}[] = [
    {video: tiles, link: "https://tilesio.netlify.app"}, 
    {video: giphy, link: "https://giphsearch.netlify.app"}, 
    {video: experiments, link:"https://portfolio-website-weld-one.vercel.app"}, 
    {video: growth, link:"https://ruancy.itch.io/growthrunner"}, 
    {video: paper, link: "https://ruancy.itch.io/glemaud-ryan-plane-war"}
];

  // Keeping this commented because it's a cool way to populate an array with React components
  // const slides = Array.from({length : 4}, (_, i ) => (<Slide title={`${i}`}/>))

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
      control.currentTime = 0;
    });
  };

  const play = () => {
    let slides = document.getElementsByClassName("slide-video");
    let vids = [...slides];
    vids.forEach((element) => {
      let control = element as HTMLVideoElement;
      control.play();
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
        <div
          className="carouselSlider"
          style={{ transform: `translate3d(${-slideIndex * 100}%, 0, 0)` }}
        >
          {" "}
          {/* You can manipulate any JSX style property dynamically with style={{prop:value}} */}
          {contents.map((resource, index) => (
            <Slide video={resource.video} onPlay={play} onPause={pause} key={index} link={resource.link} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Carousel;
