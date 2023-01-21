import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  // Initiate state of page and questions
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  // questions after fetch
  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((r) => r.json())
    .then((questions) => setQuestions(questions));
  }, []);

  // questions after add
  function onAddQuestions(newQuestion){
    setQuestions([...questions, newQuestion])
  }

  // questions after delete
  function onDelete(deletedQuestion){
    const questionsAfterDelete = questions.filter((question) => question.id !== deletedQuestion.id)
    setQuestions([questionsAfterDelete])
  }

  // questions after update
  function onUpdateQuestion(updatedQuestion){
    const updatedQuestions = questions.map((question) => {
      if(question.id === updatedQuestion.id) return updatedQuestion
      return question
    })
    setQuestions(updatedQuestions)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (<QuestionForm onAddQuestions={onAddQuestions} />) : (<QuestionList questions={questions} onDelete={onDelete} onUpdateQuestion={onUpdateQuestion}/>)}
    </main>
  );
}

export default App;
