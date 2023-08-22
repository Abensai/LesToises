import React, { useState } from 'react';
import axios from 'axios';

const Questionnaire: React.FC = () => {
    const [answer1, setAnswer1] = useState<number>(1);
    const [answer2, setAnswer2] = useState<number>(1);
    const [score, setScore] = useState<number | null>(null);
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/calculate-score', { answer1, answer2 });
            setScore(response.data.score);
            setMessage(response.data.message);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div>
                <p>Question 1: I have little interest or pleasure in doing activities.</p>
                <input type="number" min="1" max="3" value={answer1} onChange={e => setAnswer1(Number(e.target.value))} />
            </div>
            <div>
                <p>Question 2: I find it difficult to take an interest in my surroundings.</p>
                <input type="number" min="1" max="3" value={answer2} onChange={e => setAnswer2(Number(e.target.value))} />
            </div>
            <button onClick={handleSubmit}>Submit</button>
            {score !== null && <p>Score: {score}</p>}
            {message && <p>{message}</p>}
        </div>
    );
};

export default Questionnaire;
