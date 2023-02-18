import React from "react";

export default function Answer(props) {
  const dimAnswer = function () {
    if (!props.answered) {
      return false;
    }
    if (
      (props.answer.isHeld && props.answer.isCorrect) ||
      props.answer.highlightAsCorrect
    ) {
      return false;
    }
    return true;
  };

  return (
    <div
      className={`answer 
    ${props.answer.isHeld ? "answer-isHeld" : ""} 
    ${props.answer.answeredCorrectly ? "answer-selected-correct" : ""} 
    ${props.answer.answeredIncorrectly ? "answer-selected-incorrect" : ""} 
    ${props.answer.highlightAsCorrect ? "highlightAsCorrect" : ""} 
    ${props.answered ? "" : "clickable"} 
    ${dimAnswer() ? "button-dim" : ""} 
    `}
      dangerouslySetInnerHTML={{ __html: props.answer.answerBody }}
      onClick={() =>
        props.holdAnswer(props.answer.questionId, props.answer.answerId)
      }
    ></div>
  );
}
