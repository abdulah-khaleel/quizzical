import { useState } from "react";
import blobsBlue from "./assets/blobs-blue.png";
import blobsYellow from "./assets/blobs-yellow.png";
import Intro from "./Intro";
import Question from "./Question";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);

  function handleClick() {
    console.log("starting quiz");
    setQuizStarted(true);
  }

  return (
    <div className="App">
      <div className="app-container">
        {quizStarted ? (
          <div className="main">
            <Question />
            <Question />
            <Question />
            <Question />
            <Question />
          </div>
        ) : (
          <Intro handleClick={handleClick} />
          //
        )}
        <img src={blobsYellow} className="blobs-yellow" alt="blobs-yellow" />
        <img src={blobsBlue} className="blobs-blue" alt="blobs-blue" />
      </div>
    </div>
  );
}

export default App;
