import React from "react";
import { Link } from 'react-router-dom';
import "../../styles/pages/Home.css"
import LogoApp from "../../assets/images/logo.png"

const GameOnline = () => {

    return (
        <div className="home-container">
            <div className="home">
                <img src={LogoApp} alt="logo-data" className="logo-data" />
            </div>
            <Link to="/create-game" className="options">Crear partida</Link>
            <Link to="/join-game" className="options">Unirse a partida</Link>
        </div>
    );

};

export default GameOnline;
