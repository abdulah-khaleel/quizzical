import React from "react";
import "./Question.css";

export default function Question() {
  return (
    <div className="question--container">
      <p className="question">How would one say goodbye in Spanish?</p>
      <div className="answers">
        <div className="answer">Adios</div>
        <div className="answer">Hola</div>
        <div className="answer">Au Revior</div>
        <div className="answer">Bye</div>
      </div>
    </div>
  );
}
