import React, { useState, useRef } from "react";
import "../styles/pages/Game3.css";

const Game3 = () => {
  const canvasRef = useRef(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState(null);

  const drawCoin = (ctx, color) => {
    const canvas = canvasRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 10, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  };

  const flipCoin = () => {
    setIsFlipping(true);
    const isRed = Math.random() > 0.5;
    const color = isRed ? "red" : "blue";

    const ctx = canvasRef.current.getContext("2d");
    drawCoin(ctx, color);

    // Iniciar la animación de flip
    canvasRef.current.style.animation = "flipping 2s linear";

    setTimeout(() => {
      setIsFlipping(false);
      setResult(isRed ? "Cruz" : "Cara");
      canvasRef.current.style.animation = ""; // Reiniciar la animación
    }, 2000); // Duración de la animación
  };

  return (
    <div className="game3-container">
      <h2>Lanza la Moneda</h2>
      <canvas ref={canvasRef} width={200} height={200} className="coin-canvas"></canvas>
      <button
        onClick={flipCoin}
        className="flip-button"
        disabled={isFlipping}
      >
        Lanzar
      </button>
      {result && <div className="result">Resultado: {result}</div>}
    </div>
  );
};

export default Game3;
