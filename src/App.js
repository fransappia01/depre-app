import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Game1 from './pages/Game1';
import Navbar from './components/Navbar';
import Navbar2 from './components/Navbar2';
import Game2 from './pages/Game2';
import Game3 from './pages/Game3';
import Game4 from './pages/Game4';
import Game5 from './pages/Game5';

const App = () => {
  return (
    <Router>
      <Content />
    </Router>
  );
}

const Content = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/' ? <Navbar /> : <Navbar2 />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/first-game" element={<Game1 />} />
        <Route path="/second-game" element={<Game2 />} />
        <Route path="/third-game" element={<Game3 />} />
        <Route path="/fourth-game" element={<Game4 />} />
        <Route path="/fifth-game" element={<Game5 />} />
      </Routes>
    </>
  );
}

export default App;
