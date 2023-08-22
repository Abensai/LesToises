import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [answers, setAnswers] = useState<{ q1: number; q2: number }>({
    q1: 1,
    q2: 1,
  });
  const [message, setMessage] = useState<string>('');

  const handleAnswerChange = (question: number, value: number) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question === 1 ? 'q1' : 'q2']: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/calculate-score', answers);
      const score = response.data.score;

      if (score >= 5) {
        setMessage('Please make an appointment with your doctor');
      } else {
        setMessage('You have no worrying signs');
      }
    } catch (error) {
      console.error('Error calculating score:', error);
    }
  };

  return (
      <div className="App">
        <h1>Questionnaire</h1>
        <div>
          <p>Question 1: I have little interest or pleasure in doing activities.</p>
          <select onChange={(e) => handleAnswerChange(1, parseInt(e.target.value))}>
            <option value={1}>No problem</option>
            <option value={2}>Some trouble</option>
            <option value={3}>A lot of trouble</option>
          </select>
        </div>
        <div>
          <p>Question 2: I find it difficult to take an interest in my surroundings.</p>
          <select onChange={(e) => handleAnswerChange(2, parseInt(e.target.value))}>
            <option value={1}>No problem</option>
            <option value={2}>Some trouble</option>
            <option value={3}>A lot of trouble</option>
          </select>
        </div>
        <button onClick={handleSubmit}>Submit</button>
        <p>{message}</p>
      </div>
  );
}

export default App;
