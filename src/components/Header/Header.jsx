import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo_white.png';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <NavLink to="/"><img src={logo} alt="Logo Bribri" className="header__logo" /></NavLink>
      <nav>
        <ul className="header__nav">
          <li><NavLink to="/" end>Inicio</NavLink></li>
          <li><NavLink to="/informacion">Información</NavLink></li>
          <li><NavLink to="/juegos">Juegos</NavLink></li>
          <li><NavLink to="/diccionario">Diccionario</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
