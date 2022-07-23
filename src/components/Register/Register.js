// Register — компонент страницы регистрации

import React from "react";
import "./Register.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Register() {
  return (
    <section className="register">
      <div className="register__wrapper">
        <Link to="/">
          <img className="register__logo" alt="Логотип" src={logo} />
        </Link>
        <h3 className="register__wellcome">Добро пожаловать!</h3>
        <form className="register__form">
          <label className="register__title">
            Имя
            <input
              className="register__input" name="Имя" type="name" placeholder="Ваше имя" minLength="2" maxLength="40" required value='Виталий'/>
          </label>
          <label className="register__title">
            E-mail
            <input className="register__input" name="email" type="email" placeholder="Email" minLength="4" maxLength="40" required value='pochta@yandex.ru' />
          </label>
          <label className="register__title">
            Пароль
            <input className="register__input" name="password" type="password" placeholder="Пароль" minLength="2" maxLength="20" required />
          </label>
          <span className="register__input-error">Что-то пошло не так... </span>
          <button type="submit" className="register__button">
            Зарегистрироваться
          </button>
          <div className="register__text">
            Уже зарегистрированы?
            <Link className="register__link" to="/signin">Войти</Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Register;
