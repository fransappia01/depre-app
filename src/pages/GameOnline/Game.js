import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { socket } from '../../utils/socket';
import "../../styles/pages/GameOnline/Game.css";

const Game = () => {
  const { roomCode } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Para mostrar el progreso
  const [startTime, setStartTime] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit('getQuestion', { roomCode });

    socket.on('newQuestion', (question) => {
      if (question) {
        console.log('Nueva pregunta recibida:', question);
        setCurrentQuestion(question);
        setCurrentQuestionIndex(prevIndex => prevIndex + 1); // Incrementar el índice de la pregunta
        setStartTime(Date.now()); // Registrar el tiempo cuando la pregunta es recibida
      } else {
        console.error('Pregunta recibida es NULL');
      }
    });

    socket.on('gameOver', () => {
      navigate(`/results/${roomCode}`);
    });

    return () => {
      socket.off('newQuestion');
      socket.off('gameOver');
    };
  }, [roomCode, navigate]);

  const submitAnswer = (answer) => {
    const timeTaken = Date.now() - startTime;
    socket.emit('submitAnswer', { roomCode, answer, timeTaken });
  };

  if (!currentQuestion) {
    return <div>Cargando preguntas...</div>;
  }

  return (
    <div className='game-container'>
      <div className='questions-number'>
      <h2>Pregunta {currentQuestionIndex}/12</h2>
      </div>
      <div className='questions-container'>
      <h2>{currentQuestion.question}</h2>
        <div className="options-container">
          {currentQuestion.options.map((option, index) => (
            <button className='button-game' key={index} onClick={() => submitAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className='time-container'>
          Tiempo: 
        </div>
    </div>
  );
};

export default Game;
