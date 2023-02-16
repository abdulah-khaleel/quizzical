import React from "react";
import { useState } from "react";
import { nanoid } from "nanoid";
import blobsBlue from "./assets/blobs-blue.png";
import blobsYellow from "./assets/blobs-yellow.png";
import Intro from "./Intro";
import Question from "./Question";
import "./App.css";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [rawQuestionsArray, setRawQuestionsArray] = useState([]);
  const [newQuestions, setNewQuestions] = useState([]);
  const [gameCount, setGameCount] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [allAnswered, setAllAnswered] = useState(false);

  React.useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"
    )
      .then((res) => res.json())
      .then((data) => setRawQuestionsArray(data.results));
    prepareQuestions();
  }, [gameCount]);

  React.useEffect(() => {
    console.log("checking how many questions were answered !!");
    let answeredQuestionsCount = 0;
    for (const question of newQuestions) {
      for (const answer of question.answersArray) {
        if (answer.isHeld) {
          answeredQuestionsCount += 1;
        } else {
          console.log("not held");
        }
      }
    }

    if (answeredQuestionsCount === 5) {
      setAllAnswered(true);
    }
  }, [newQuestions]);

  function prepareQuestions() {
    const formattedQuestions = [];
    for (const question of rawQuestionsArray) {
      const index = Math.floor(Math.random() * 4);
      const shuffledAnswers = [...question.incorrect_answers];
      const questionId = nanoid();
      shuffledAnswers.splice(index, 0, question.correct_answer);

      // generate an array of answer objects - each with its held
      //  status and heldCorrect and heldIncorrect
      const answersArray = shuffledAnswers.map((answer) => ({
        questionId: questionId,
        answerId: nanoid(),
        answerBody: answer,
        isHeld: false,
        isCorrect: question.correct_answer === answer ? true : false,
        answeredCorrectly: false,
        answeredIncorrectly: false,
        highlightAsCorrect: false,
      }));

      formattedQuestions.push({
        questionId: questionId,
        body: question.question,
        answers: shuffledAnswers,
        answersArray: answersArray,
        correctAnswer: question.correct_answer,
        correctAnswerIndex: index,
      });
    }
    console.log(formattedQuestions);
    setNewQuestions(formattedQuestions);
  }

  function handleClick() {
    setGameCount((oldCount) => oldCount + 1);
    setQuizStarted(true);
  }

  function generateNewQuestion() {
    setGameCount((oldCount) => oldCount + 1);
    setAnswered(false);
  }

  function checkAnswers() {
    if (allAnswered) {
      const newQuestionsArray = [...newQuestions];
      for (const question of newQuestionsArray) {
        for (const answer of question.answersArray) {
          if (answer.isHeld && answer.isCorrect) {
            answer.answeredCorrectly = true;
          } else if (answer.isHeld && !answer.isCorrect) {
            answer.answeredIncorrectly = true;
          } else if (
            !answer.answeredCorrectly &&
            !answer.answeredIncorrectly &&
            answer.isCorrect
          ) {
            answer.highlightAsCorrect = true;
          }
        }
      }
      setNewQuestions(newQuestionsArray);
      setAnswered(true);
    }
  }

  function holdAnswer(questionId, answerId) {
    if (!answered) {
      const newQuestionsArray = [...newQuestions];
      for (const question of newQuestionsArray) {
        if (question.questionId === questionId) {
          for (const answer of question.answersArray) {
            if (answer.answerId === answerId) {
              answer.isHeld = !answer.isHeld;
            } else {
              answer.isHeld = false;
            }
          }
        }
      }

      setNewQuestions(newQuestionsArray);
    }
  }

  const questionsElements = newQuestions.map((questionObj) => (
    <Question
      key={questionObj.questionId}
      question={questionObj.body}
      answers={questionObj.answers}
      answersArray={questionObj.answersArray}
      holdAnswer={holdAnswer}
      answered={answered}
    />
  ));

  return (
    <div className="App">
      <div className="app-container">
        {quizStarted ? (
          <div className="main">
            {questionsElements}
            <button className="btn--verify " onClick={generateNewQuestion}>
              New Questions
            </button>
            {!answered && (
              <button className="btn--verify " onClick={checkAnswers}>
                {allAnswered ? "Check Answers" : "Attempt All Questions"}
              </button>
            )}
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
