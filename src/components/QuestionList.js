import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, onDelete, onUpdateQuestion}) {
  const eachQuiz = questions.map((question) => {
    return <QuestionItem key={question.id} question={question} onDelete={onDelete} updateQuestion={onUpdateQuestion}/>
  })
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{eachQuiz}</ul>
    </section>
  );
}

export default QuestionList;
