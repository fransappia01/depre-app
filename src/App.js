import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Game1 from './pages/Game1';
import Navbar from './components/Navbar';
import Navbar2 from './components/Navbar2';
import Navbar3 from './components/Navbar3';
import Game2 from './pages/Game2';
import Game3 from './pages/Game3';
import Game4 from './pages/Game4';
import Game5 from './pages/Game5';
import GameOnline from './pages/GameOnline/GameOnline';
import CreateGame from './pages/GameOnline/CreateGame';
import JoinGame from './pages/GameOnline/JoinGame';
import Lobby from './pages/GameOnline/Lobby';
import Game from './pages/GameOnline/Game';
import Results from './pages/GameOnline/Results';
import PreGame from './pages/GameOnline/PreGame';

const App = () => {
  return (
    <Router>
      <Content />
    </Router>
  );
}

const Content = () => {
  const location = useLocation();

  const renderNavbar = () => {
    if (location.pathname === '/') {
      return <Navbar />;
    } else if (location.pathname.startsWith('/lobby/') || (location.pathname.startsWith('/game/')) || (location.pathname.startsWith('/results/'))) {
      return <Navbar3 />;
    } else {
      return <Navbar2 />;
    }
  };

  return (
    <>
      {renderNavbar()}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/first-game" element={<Game1 />} />
        <Route path="/second-game" element={<Game2 />} />
        <Route path="/third-game" element={<Game3 />} />
        <Route path="/fourth-game" element={<Game4 />} />
        <Route path="/fifth-game" element={<Game5 />} />
        <Route path="/online-game" element={<GameOnline />} />
        <Route path="/create-game" element={<CreateGame />} />
        <Route path="/join-game" element={<JoinGame />} />
        <Route path="/pre-game/:roomCode" element={<PreGame />} />
        <Route path="/lobby/:roomCode" element={<Lobby />} />
        <Route path="/game/:roomCode" element={<Game />} />
        <Route path="/results/:roomCode" element={<Results />} />
      </Routes>
    </>
  );
}

export default App;
