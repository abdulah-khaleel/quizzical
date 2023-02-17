import React from "react";

export default function Answer(props) {
  const dimAnswer = function () {
    if (props.answered) {
      if (props.isHeld && props.isCorrect) {
        return false;
      } else if (props.highlightAsCorrect) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  // const doNotDimAnswer = function () {
  //   if (props.answered) {
  //     if (props.isHeld && props.isCorrect) {
  //       return true;
  //     } else if (props.highlightAsCorrect) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } else {
  //     return true;
  //   }
  // };
  return (
    <div
      className={`answer 
    ${props.isHeld ? "answer-isHeld" : ""} 
    ${props.answeredCorrectly ? "answer-selected-correct" : ""} 
    ${props.answeredIncorrectly ? "answer-selected-incorrect" : ""} 
    ${props.highlightAsCorrect ? "highlightAsCorrect" : ""} 
    ${!props.answered ? "clickable" : ""} 
    ${dimAnswer() ? "button-dim" : ""} 
    `}
      dangerouslySetInnerHTML={{ __html: props.answerBody }}
      onClick={() => props.holdAnswer(props.questionId, props.answerId)}
    ></div>
  );
}
