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
      <p className="credit-trivia">
        Questions from the{" "}
        <a href="https://opentdb.com/">Open Trivia Database </a> API
      </p>
    </div>
  );
}
