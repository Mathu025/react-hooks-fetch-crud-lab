import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => onDelete(id));
  }

  function handleCorrectAnswerChange(e) {
    const updatedIndex = parseInt(e.target.value);
    
    // Create the optimistically updated question
    const updatedQuestion = { ...question, correctIndex: updatedIndex };
    
    // Update UI immediately (optimistic update)
    onUpdate(updatedQuestion);
    
    // Then sync with server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: updatedIndex }),
    })
      .then((r) => r.json())
      .then((serverResponse) => {
        // Only update again if server response differs from our optimistic update
        if (serverResponse.correctIndex !== updatedIndex) {
          onUpdate(serverResponse);
        }
      })
      .catch((error) => {
        // Revert to original state if server request fails
        console.error("Failed to update question:", error);
        onUpdate(question); // revert to original
      });
  }

  return (
    <li>
      <h4>{prompt}</h4>
      <label htmlFor={`correctAnswer-${id}`}>
        Correct Answer:
        <select
          id={`correctAnswer-${id}`}
          aria-label="Correct Answer"
          value={correctIndex}
          onChange={handleCorrectAnswerChange}
        >
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;