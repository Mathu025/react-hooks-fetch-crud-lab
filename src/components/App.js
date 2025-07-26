import React, { useEffect, useState } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    let isMounted = true; // Track if component is mounted
    
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => {
        if (isMounted) { // Only update state if component is still mounted
          setQuestions(data);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.error("Failed to fetch questions:", error);
          setQuestions([]);
        }
      });

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions((prev) => [...prev, newQuestion]);
    setShowForm(false);
  }

  function handleDeleteQuestion(id) {
    const updatedQuestions = questions.filter((q) => q.id !== id);
    setQuestions(updatedQuestions);
  }

  function handleUpdateAnswer(updatedQuestion) {
    const updated = questions.map((q) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updated);
  }

  return (
    <div>
      <h1>Quiz Questions</h1>
      <button onClick={() => setShowForm(true)}>New Question</button>
      <button onClick={() => setShowForm(false)}>View Questions</button>
      {showForm ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateAnswer={handleUpdateAnswer}
        />
      )}
    </div>
  );
}

export default App;