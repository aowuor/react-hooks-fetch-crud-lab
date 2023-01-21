import React from "react";

function QuestionItem({ question, onDelete, updateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  
  // Delete specific question
  function handleDeleteClick(){
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    })
    .then((res) => res.json())
    .then(() => onDelete(question));
  }

  // get answer input and update in database
  function changeAnswer(e){
    const correctIndex = parseInt(e.target.value)
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({correctIndex}),
    })
      .then((r) => r.json())
      .then((updatedQuestions) => updateQuestion(updatedQuestions))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={changeAnswer}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
