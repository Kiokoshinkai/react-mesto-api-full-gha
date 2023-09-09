import React from "react";
import { Link } from "react-router-dom";

function Header({ logo, mail, route, onClick, title }) {
  return (
    <header className="header page__header">
      <img src={logo} alt="Логотип Место Россия" className="logo" />
      <nav className="header__auth-info">
        <p className="header__user-mail">{mail}</p>
        <Link to={route} className="header__link" type="button" onClick={onClick}>{title}</Link>
      </nav>
    </header>
  );
}

export default Header;
