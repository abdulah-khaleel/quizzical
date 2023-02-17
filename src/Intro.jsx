import React from "react";
import "./Intro.css";

export default function Intro(props) {
  return (
    <div className="intro--container">
      <h1 className="intro--title">Quizzical</h1>
      <p className="intro--greeting-text">
        Test your knowledge with this short trivia quizz
      </p>
      <button onClick={props.handleClick} className="btn btn--intro">
        Start Quiz
      </button>
    </div>
  );
}
