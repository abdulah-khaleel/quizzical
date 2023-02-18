import React from "react";
import "./Question.css";
import Answer from "./Answer";

export default function Question(props) {
  const [answersArray, setAnswersArray] = React.useState([
    ...props.question.answersArray,
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
      key={answer.answerId}
      answer={answer}
      holdAnswer={props.holdAnswer}
      answered={props.answered}
    />
  ));

  return (
    <div className="question--container">
      <p
        className="question"
        dangerouslySetInnerHTML={{ __html: props.question.body }}
      ></p>

      <div className="answers">{newAnswersElements}</div>
    </div>
  );
}
