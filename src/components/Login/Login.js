// Login — компонент страницы авторизации

import React from "react";
import "./Login.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Login() {
  return (
    <section className="login">
      <div className="login__wrapper">
        <Link to="/" className='login__logo-link'>
          <img className="login__logo" src={logo} alt="Логотип" />
        </Link>
        <h3 className="login__wellcome">Рады видеть!</h3>
        <form className="login__form">
          <label className="login__title">
            E-mail
            <input className="login__input" type="email" name="email" minLength="4" maxLength="40" placeholder="Email" required value='pochta@yandex.ru'/>
          </label>
          <label className="login__title">
            Пароль
            <input className="login__input" type="password" name="password" minLength="2" maxLength="20" placeholder="Пароль" required />
          </label>
          <button type="submit" className="login__button">Войти</button>
          <p className="login__text">
            Ещё не зарегистрированы?
            <Link className="login__link" to="/signup">Регистрация </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;