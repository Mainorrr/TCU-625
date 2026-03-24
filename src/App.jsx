import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Home from './pages/Home/Home.jsx';
import Info from './pages/Info/Info.jsx';
import Games from './pages/Games/Games.jsx';
import Dictionary from './pages/Dictionary/Dictionary.jsx';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/informacion" element={<Info />} />
        <Route path="/juegos" element={<Games />} />
        <Route path="/diccionario" element={<Dictionary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
