import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/pages/GameOnline/JoinGame.css";

const JoinGame = () => {
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    // Verifica si el código de la sala está en el formato correcto (opcional)
    if (!roomCode.trim()) {
      alert('Por favor, ingresa un código de sala.');
      return;
    }

    // Navega a la vista donde el usuario podrá ingresar su nombre y seleccionar un avatar
    navigate(`/pre-game/${roomCode}`);
  };

  return (
    <div className='join-game-container'>
      <h2>Unirse a una partida</h2>
      <input 
        type="text" 
        placeholder="Código de la sala" 
        value={roomCode} 
        onChange={(e) => setRoomCode(e.target.value)} 
      />
      <button onClick={handleJoinRoom}>Continuar</button>
    </div>
  );
};

export default JoinGame;
