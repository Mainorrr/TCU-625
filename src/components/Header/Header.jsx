import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/common/logo_white.png';
import './Header.css';

function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="header">
      <NavLink to="/" onClick={close}>
        <img src={logo} alt="Logo Bribri" className="header__logo" />
      </NavLink>

      <button
        type="button"
        className={'header__toggle' + (open ? ' header__toggle--open' : '')}
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        aria-controls="header-nav"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="header__bar" />
        <span className="header__bar" />
        <span className="header__bar" />
      </button>

      <nav
        id="header-nav"
        className={'header__nav-wrap' + (open ? ' header__nav-wrap--open' : '')}
      >
        <ul className="header__nav">
          <li><NavLink to="/" end onClick={close}>Inicio</NavLink></li>
          <li><NavLink to="/juegos" onClick={close}>Juegos</NavLink></li>
          <li><NavLink to="/diccionario" onClick={close}>Diccionario</NavLink></li>
          <li><NavLink to="/informacion" onClick={close}>Información</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
