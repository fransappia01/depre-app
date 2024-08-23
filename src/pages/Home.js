import React from "react";
import { Link } from 'react-router-dom';
import "../styles/pages/Home.css"
import LogoApp from "../assets/images/logo.png"

const Home = () => {

    return (
        <div className="home-container">
            <div className="home">
                <img src={LogoApp} alt="logo-data" className="logo-data" />
            </div>
            <Link to="/first-game" className="options">Número random</Link>
            <Link to="/second-game" className="options">Ruleta</Link>
            <Link to="/fourth-game" className="options">Sorteo</Link>
            <Link to="/fifth-game" className="options">Anotador Truco</Link>
        </div>
    );

};

export default Home;
