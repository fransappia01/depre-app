// Countdown.js
import React, { useState, useEffect } from 'react';
import "../styles/components/Countdown.css"

const Countdown = ({ onCountdownEnd }) => {
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    if (seconds === 0) {
      onCountdownEnd();
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, onCountdownEnd]);

  return (
    <div className="countdown">
      <h1>{seconds}</h1>
    </div>
  );
};

export default Countdown;
