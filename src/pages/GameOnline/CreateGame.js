import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../utils/socket';
import avatar1 from '../../assets/images/GameOnline/avatars/1.png';
import avatar2 from '../../assets/images/GameOnline/avatars/2.png';
import avatar3 from '../../assets/images/GameOnline/avatars/3.png';
import avatar4 from '../../assets/images/GameOnline/avatars/4.png';
import avatar5 from '../../assets/images/GameOnline/avatars/5.png';
import avatar6 from '../../assets/images/GameOnline/avatars/6.png';
import avatar7 from '../../assets/images/GameOnline/avatars/7.png';
import avatar8 from '../../assets/images/GameOnline/avatars/8.png';
import "../../styles/pages/GameOnline/CreateGame.css";

// Se mapea el nombre porque sino se cambia sola la ruta de la imagen y no aparece
const avatarMap = {
  [avatar1]: '1.png',
  [avatar2]: '2.png',
  [avatar3]: '3.png',
  [avatar4]: '4.png',
  [avatar5]: '5.png',
  [avatar6]: '6.png',
  [avatar7]: '7.png',
  [avatar8]: '8.png',
};

const CreateGame = () => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [roomCode, setRoomCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createRoom = () => {
    if (!name.trim()) {
      alert('Por favor, ingresa un nombre.');
      return;
    }

    if (!avatar) {
      alert('Por favor, selecciona un avatar.');
      return;
    }

    setLoading(true);
    socket.emit('createRoom', { name, avatar: avatarMap[avatar] }, (code) => {
      setRoomCode(code);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (roomCode) {
      navigate(`/lobby/${roomCode}`);
    }
  }, [roomCode, navigate]);

  const avatarOptions = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8];

  return (
    <div className='create-game-container'>
      <h2>Crear nueva partida</h2>
      <input
        type="text"
        placeholder="Tu nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
      />
      <div className='avatar-selection'>
        {avatarOptions.map((option, index) => (
          <div
            key={index}
            onClick={() => setAvatar(option)}
            className={`avatar-option ${avatar === option ? 'selected' : ''}`}
          >
            <img
              src={option}
              alt={`Avatar ${index + 1}`}
              className="avatar-image"
            />
          </div>
        ))}
      </div>
      <button onClick={createRoom} disabled={loading}>
        {loading ? 'Cargando...' : 'Crear sala'}
      </button>
    </div>
  );
};

export default CreateGame;
