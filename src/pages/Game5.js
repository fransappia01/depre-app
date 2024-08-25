import React, { useState, useEffect } from 'react';
import "../styles/pages/Game5.css";
import palitoImage from '../assets/images/cont-truco.png';
import Porrini from "../assets/images/porrini.png"

const Game5 = () => {
  const [nosPalitos, setNosPalitos] = useState('');
  const [ellosPalitos, setEllosPalitos] = useState('');
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    // Cargar datos del local storage
    const savedNosPalitos = parseInt(localStorage.getItem('nosPalitos'), 10);
    const savedEllosPalitos = parseInt(localStorage.getItem('ellosPalitos'), 10);

    if (!isNaN(savedNosPalitos)) setNosPalitos(savedNosPalitos);
    if (!isNaN(savedEllosPalitos)) setEllosPalitos(savedEllosPalitos);
  }, []);

  useEffect(() => {
    // Guardar datos en el local storage
    console.log('Guardando en localStorage:', { nosPalitos, ellosPalitos });
    localStorage.setItem('nosPalitos', nosPalitos);
    localStorage.setItem('ellosPalitos', ellosPalitos);
  }, [nosPalitos, ellosPalitos]);
  

  useEffect(() => {
    // Mostrar alerta si algún equipo gana
    if (nosPalitos >= 30) {
      setWinner('Nosotros');
    } else if (ellosPalitos >= 30) {
      setWinner('Ellos');
    }
  }, [nosPalitos, ellosPalitos]);

  const handleAddPalito = (team) => {
    if (team === 'nos') {
      setNosPalitos(prev => Math.min(prev + 1, 30)); // Limitar a 30
    } else {
      setEllosPalitos(prev => Math.min(prev + 1, 30)); // Limitar a 30
    }
  };

  const handleRemovePalito = (team) => {
    if (team === 'nos' && nosPalitos > 0) {
      setNosPalitos(nosPalitos - 1);
    } else if (team === 'ellos' && ellosPalitos > 0) {
      setEllosPalitos(ellosPalitos - 1);
    }
  };

  const renderPalitos = (count) => {
    let palitos = [];
    const groupsOfFive = Math.floor(count / 5);
    const remaining = count % 5;

    for (let i = 0; i < groupsOfFive; i++) {
      palitos.push(
        <div key={`group-${i}`} className={`palito-group group-${i}`}>
          <img src={palitoImage} alt="Palito" className="palito-image vertical" />
          <img src={palitoImage} alt="Palito" className="palito-image horizontal" />
          <img src={palitoImage} alt="Palito" className="palito-image vertical2" />
          <img src={palitoImage} alt="Palito" className="palito-image horizontal2" />
          <img src={palitoImage} alt="Palito" className="palito-image diagonal" />
        </div>
      );
    }

    if (remaining > 0) {
      const palitoOrder = ['vertical', 'horizontal', 'vertical2', 'horizontal2', 'diagonal'];
      palitos.push(
        <div key={`remaining-group`} className={`palito-group group-${groupsOfFive}`}>
          {palitoOrder.slice(0, remaining).map((className, index) => (
            <img key={index} src={palitoImage} alt="Palito" className={`palito-image ${className}`} />
          ))}
        </div>
      );
    }

    return palitos;
  };

  return (
    <div className="game5-container">
      <h2 className='anotador-title'>Anotador Truco</h2>
      <div className="fixed-rectangle">
        <div className="name-container left" onClick={() => handleAddPalito('nos')}>
          <span className="name">Nos</span>
          <div className="palitos-container">
            {renderPalitos(nosPalitos)}
          </div>
        </div>
        <div className="name-container right" onClick={() => handleAddPalito('ellos')}>
          <span className="name">Ellos</span>
          <div className="palitos-container">
            {renderPalitos(ellosPalitos)}
          </div>
        </div>
        <div className="vertical-line"></div>
        <div className="horizontal-line"></div>
        <div className="horizontal-line2"></div>

        <div className="icons-container left-icons">
          <button className="icon-button" onClick={() => handleAddPalito('nos')}>+</button>
          <button className="icon-button" onClick={() => handleRemovePalito('nos')}>-</button>
        </div>
        <div className="icons-container right-icons">
          <button className="icon-button" onClick={() => handleAddPalito('ellos')}>+</button>
          <button className="icon-button" onClick={() => handleRemovePalito('ellos')}>-</button>
        </div>
      </div>
      <div className='container-down-left' onClick={() => handleAddPalito('nos')}>  
      </div>
      <div className='container-down-right' onClick={() => handleAddPalito('ellos')}>  
      </div>
      <button className='boton-reiniciar' onClick={() => { setNosPalitos(0); setEllosPalitos(0); }}>Reiniciar partida</button>

      {winner && (
        <div className="alert-overlay">
          <div className="alert-box">
            <h3>¡Ganó {winner}!</h3>
            <img src={Porrini} alt="porrini-img" className="porrini-img"></img>
            <button className="alert-close-button" onClick={() => setWinner(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game5;
