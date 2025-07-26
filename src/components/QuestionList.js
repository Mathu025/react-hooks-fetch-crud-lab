import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onDeleteQuestion, onUpdateAnswer }) {
  return (
    <section>
      <h2>Questions</h2>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={onDeleteQuestion}      // ✅ rename for QuestionItem
            onUpdate={onUpdateAnswer}        // ✅ rename for QuestionItem
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
