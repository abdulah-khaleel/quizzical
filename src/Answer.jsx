import React from "react";

export default function Answer(props) {
  return (
    <div
      className={`answer 
    ${props.isHeld ? "answer-isHeld" : ""} 
    ${props.answeredCorrectly ? "answer-selected-correct" : ""} 
    ${props.answeredIncorrectly ? "answer-selected-incorrect" : ""} 
    ${props.highlightAsCorrect ? "highlightAsCorrect" : ""} 
    ${props.answered ? "clickable" : ""} 
    `}
      dangerouslySetInnerHTML={{ __html: props.answerBody }}
      // onClick={props.holdAnswer}
      // onClick={props.holdAnswer}
      onClick={() => props.holdAnswer(props.questionId, props.answerId)}
    ></div>
  );
}
