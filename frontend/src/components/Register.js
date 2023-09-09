import React from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmail(evt) {
    setEmail(evt.target.value);
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(email, password);
  }

  return (
    <section className="login">
      <h2 className="login__title">Регистрация</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input id="email-input" name="email" type="email" placeholder="E-mail" className="login__input" value={email} onChange={handleEmail} required />
        <input id="password-input" name="password" type="password" placeholder="Пароль" className="login__input" value={password} onChange={handlePassword} required />
        <button aria-label="войти" type="submit" className="login__button">Зарегистрироваться</button>
      </form>
      <p className="login__subtitle">Уже зарегистрированы? <Link to="sign-in" className="login__link">Войти</Link></p>
    </section>
  )
}

export default Register;
