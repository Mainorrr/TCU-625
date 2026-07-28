import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Games from './pages/Games/Games.jsx';
import About from './pages/About/About.jsx';
import Credits from './pages/Credits/Credits.jsx';
import Tcu625 from './pages/Tcu625/Tcu625.jsx';
import Vocabulary from './pages/Vocabulary/Vocabulary.jsx';

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Games />} />
        <Route path="/sobre-este-recurso" element={<About />} />
        <Route path="/creditos" element={<Credits />} />
        <Route path="/sobre-el-tcu-625" element={<Tcu625 />} />
        <Route path="/vocabulario" element={<Vocabulary />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
