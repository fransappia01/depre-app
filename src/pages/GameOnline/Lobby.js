import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { socket } from '../../utils/socket';
import "../../styles/pages/GameOnline/Lobby.css";

import avatar1 from '../../assets/images/GameOnline/avatars/1.png';
import avatar2 from '../../assets/images/GameOnline/avatars/2.png';
import avatar3 from '../../assets/images/GameOnline/avatars/3.png';
import avatar4 from '../../assets/images/GameOnline/avatars/4.png';
import avatar5 from '../../assets/images/GameOnline/avatars/5.png';
import avatar6 from '../../assets/images/GameOnline/avatars/6.png';
import avatar7 from '../../assets/images/GameOnline/avatars/7.png';
import avatar8 from '../../assets/images/GameOnline/avatars/8.png';

import { IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const avatars = {
  '1.png': avatar1,
  '2.png': avatar2,
  '3.png': avatar3,
  '4.png': avatar4,
  '5.png': avatar5,
  '6.png': avatar6,
  '7.png': avatar7,
  '8.png': avatar8,
};

const Lobby = () => {
  const { roomCode } = useParams();
  const [players, setPlayers] = useState([]);
  const [isHost, setIsHost] = useState(false);
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit('getPlayers', { roomCode });

    socket.on('updatePlayers', (updatedPlayers) => {
      console.log('Lista de jugadores actualizada:', updatedPlayers);
      console.log("socket", socket.id);

      if (updatedPlayers[0].id === socket.id) {
        setIsHost(true);
      } else {
        setIsHost(false);
      }

      setPlayers(updatedPlayers.reverse());
    });

    socket.on('playerLeft', ({ name }) => {
      setNotification(`${name} abandonó la sala`);
      setTimeout(() => setNotification(''), 3000);
    });

    socket.on('startGame', () => {
      navigate(`/game/${roomCode}`);
    });

    return () => {
      socket.off('updatePlayers');
      socket.off('playerLeft');
      socket.off('startGame');
    };
  }, [roomCode, navigate]);

  const startGame = () => {
    if (players.length <= 5) {
      socket.emit('startGame', { roomCode });
    } else {
      alert('El máximo de jugadores es 5');
    }
  };

  console.log(players, "jogg")

  const copyToClipboard = () => {
    const tempInput = document.createElement('input');
    tempInput.value = roomCode;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('Código copiado al portapapeles');
  };

  return (
    <div className='lobby-container'>
      <h2>
        Sala: {roomCode}{' '}
        <IconButton onClick={copyToClipboard}>
          <ContentCopyIcon style={{ color: 'black', width: '20px' }} />
        </IconButton>
      </h2>
      {notification && <p>{notification}</p>}
      <ul className='players-list'>
        {players.map((player, index) => (
          <li key={index} className='player-item'>
            <img 
              src={avatars[player.avatar] || avatar1} 
              alt={player.name}
              className='player-avatar'
            />                    
            <div className='line-divider'></div>
            <p>{player.name}</p>
          </li>
        ))}
      </ul>
      {isHost ? (
        <button onClick={startGame} disabled={players.length < 2}>
          Iniciar Juego
        </button>
      ) : (
        <p>Esperando al anfitrión...</p>
      )}
    </div>
  );
};

export default Lobby;
