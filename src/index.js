import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";
import posed, { PoseGroup } from "react-pose";
import "./styles.css";

let AnimatableDiv = posed.div({
  enter: {
    y: 0,
    x: 0,
    opacity: 1,
    rotate: "0deg",
    transition: {
      duration: 3000
    }
  },
  exit: {
    x: "-150%",
    opacity: 0.5,
    transition: {
      duration: 3000,
      delay: 1000
    }
  }
});

function Slider(props) {
  let [sliderIndex, setSlideIndex] = useState(0);
  let [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let cTimeout = null;
    if (isPlaying) {
      cTimeout = setTimeout(function() {
        setSlideIndex((sliderIndex + 1) % props.children.length);
      }, 3000);
    }
    return () => {
      window.clearTimeout(cTimeout);
    };
  }, [isPlaying, sliderIndex, props.children.length]);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <PoseGroup>
        {props.children.map(function(child, indx) {
          return (
            (indx === sliderIndex && (
              <AnimatableDiv key={indx}>
                {props.children[sliderIndex]}
              </AnimatableDiv>
            )) ||
            null
          );
        })}
      </PoseGroup>
      <div style={{ position: "absolute", left: "10px", top: "50%" }}>&lt;</div>
      <div style={{ position: "absolute", right: "10px", top: "50%" }}>
        &gt;
      </div>
      <div
        onClick={() => setIsPlaying(!isPlaying)}
        style={{ position: "absolute", right: "50%", top: "80%" }}
      >
        {isPlaying ? "pause" : "play"}
      </div>
    </div>
  );
}

function App() {
  return (
    <Slider>
      <img
        key={1}
        width="100%"
        src="https://images.unsplash.com/photo-1555605562-eb11c2d46767?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
      />
      <img
        key={2}
        width="100%"
        src="https://images.unsplash.com/photo-1553615738-d8e0829f1d61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80"
      />

      <img
        key={3}
        width="100%"
        src="https://images.unsplash.com/photo-1533331639-74f1863c7b3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      />
      <img
        key={4}
        width="100%"
        src="https://images.unsplash.com/photo-1553696590-4b3f68898333?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
      />
      <img
        key={5}
        width="100%"
        src="https://images.unsplash.com/photo-1553289038-6638b1a1802a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
      />
      <img
        key={6}
        src="https://images.unsplash.com/photo-1551482850-d649f078ed01?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
      />
      <img
        key={7}
        width="100%"
        src="https://images.unsplash.com/photo-1522443286374-01dc7e91433a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
      />
    </Slider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
