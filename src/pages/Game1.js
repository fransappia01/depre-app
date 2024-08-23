import React, { useState } from "react";
import { Slider, Button } from "@mui/material";
import "../styles/pages/Game1.css";
import Porrini from "../assets/images/porrini.png"

const Game1 = () => {
    const [range, setRange] = useState([1, 100]);
    const [randomNumber, setRandomNumber] = useState(null);

    const handleRangeChange = (event, newValue) => {
        setRange(newValue);
    };

    const handleRangeChangeCommitted = (event, newValue) => {
        setRange(newValue);
    };

    const generateRandomNumber = () => {
        const min = range[0];
        const max = range[1];
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        setRandomNumber(randomNum);
    };

    return (
        <div className="game1-container">
            <h2>Selecciona el rango</h2>
            <Slider
                value={range}
                onChange={handleRangeChange}
                onChangeCommitted={handleRangeChangeCommitted}
                valueLabelDisplay="on"
                min={1}
                max={100}
                className="slider"
            />
            <Button variant="contained" color="primary" onClick={generateRandomNumber}>
                Generar Número
            </Button>
            {randomNumber !== null && (
                <div className="result">
                    {randomNumber}
                </div>
            )}
            <img src={Porrini} alt="porrini-img" className="porrini-img"></img>
        </div>
    );
};

export default Game1;
