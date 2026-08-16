import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/common/logo.png';
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
          <li><NavLink to="/" end onClick={close}>Práctica</NavLink></li>
          <li><NavLink to="/vocabulario" onClick={close}>Vocabulario</NavLink></li>
          <li><NavLink to="/sobre-este-recurso" onClick={close}>Sobre este recurso</NavLink></li>
          <li><NavLink to="/creditos" onClick={close}>Créditos</NavLink></li>
          <li><NavLink to="/sobre-el-tcu-625" onClick={close}>Sobre el TCU-625</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
