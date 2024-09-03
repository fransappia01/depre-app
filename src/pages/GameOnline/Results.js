import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { socket } from '../../utils/socket';
import "../../styles/pages/GameOnline/Results.css"

const Results = () => {
  const { roomCode } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    socket.emit('getResults', { roomCode });

    socket.on('updateResults', (results) => {
      setResults(results);
    });

    return () => {
      socket.off('updateResults');
    };
  }, [roomCode]);

  return (
    <div className='results-container'>
      <h2>Resultados</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result.name}: {result.score}</li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
