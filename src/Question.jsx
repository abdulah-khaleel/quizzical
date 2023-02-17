import React from "react";
import "./Question.css";
import Answer from "./Answer";
import { nanoid } from "nanoid";

export default function Question(props) {
  const [answersArray, setAnswersArray] = React.useState([
    ...props.answersArray,
  ]);

  function holdAnswer(id) {
    const newAnswersArray = answersArray.map((answerObj) => {
      return answerObj.answerId === id
        ? { ...answerObj, isHeld: !answerObj.isHeld }
        : answerObj;
    });
    setAnswersArray((oldArray) => newAnswersArray);
  }

  const newAnswersElements = answersArray.map((answer) => (
    <Answer
      answerBody={answer.answerBody}
      key={answer.answerId}
      answerId={answer.answerId}
      questionId={answer.questionId}
      isHeld={answer.isHeld ? true : false}
      answeredCorrectly={answer.answeredCorrectly}
      answeredIncorrectly={answer.answeredIncorrectly}
      highlightAsCorrect={answer.highlightAsCorrect}
      isCorrect={answer.isCorrect}
      holdAnswer={props.holdAnswer}
      answered={props.answered}
    />
  ));

  return (
    <div className="question--container">
      <p
        className="question"
        dangerouslySetInnerHTML={{ __html: props.question }}
      ></p>

      <div className="answers">{newAnswersElements}</div>
    </div>
  );
}
