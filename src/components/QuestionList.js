import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onDeleteQuestion, onUpdateAnswer }) {
  // Handle case where questions might be undefined or null
  if (!questions || !Array.isArray(questions)) {
    return (
      <section>
        <h2>Questions</h2>
        <p>No questions available.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Questions</h2>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={onDeleteQuestion}
            onUpdate={onUpdateAnswer}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;