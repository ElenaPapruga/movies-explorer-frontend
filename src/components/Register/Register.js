// Register — компонент страницы регистрации

import React from "react";
import { useEffect, useState } from "react";
import "./Register.css";
import logo from "../../images/logo.svg";
import { Redirect, Link } from "react-router-dom";
import Preloader from "../Preloader/Preloader";
import useFormWithValidation from "../../services/useFormWithValidation"

function Register(props) {
  const { resetForm } = useFormWithValidation({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false)

  const handleChangeName = (event) => {
    const target = event.target;
    const name = target.name;
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(event.target.closest('form').checkValidity());
    setName(event.target.value);
  }

  function handleChangeEmail(event) {
    const target = event.target;
    const name = target.name;
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(event.target.closest('form').checkValidity());
    setEmail(event.target.value);
  }

  // Проверка на валидность
  function handleChangePassword(event) {
    const target = event.target;
    const name = target.name;
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(event.target.closest('form').checkValidity());
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onRegister({ name, email, password });
    resetForm();
  }

  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
  }, []);

  return (
    <div>
      {!props.loggedIn ? (
        <section className="register">
          {props.isLoading ? (
            <Preloader />
          ) : (
            <div className="register__wrapper">
              <Link to="/">
                <img className="register__logo" alt="Логотип" src={logo} />
              </Link>
              <h3 className="register__wellcome">Добро пожаловать!</h3>
              <form className="register__form" onSubmit={handleSubmit}>
                <label className="register__title">
                  Имя
                  <input
                    className="register__input"
                    pattern="^[а-яА-ЯёЁa-zA-Z0-9]+$"
                    name="Имя"
                    type="name"
                    minLength="2"
                    maxLength="20"
                    placeholder="Ваше имя"
                    required
                    value={name.name || ''}
                    onChange={handleChangeName}
                  />
                </label>
                <span className="register__input-error">{errors.name}</span>
                <label className="register__title">
                  E-mail
                  <input
                    className="register__input"
                    name="email"
                    type="email"
                    minLength="8"
                    maxLength="20"
                    placeholder="Email"
                    required
                    value={email.email || ''}
                    onChange={handleChangeEmail}
                  />
                </label>
                <span className="register__input-error">{errors.email}</span>
                <label className="register__title">
                  Пароль
                  <input
                    className="register__input"
                    name="password"
                    type="password"
                    minLength="8"
                    maxLength="20"
                    placeholder="Пароль"
                    value={password.password || ''}
                    onChange={handleChangePassword}
                    required
                  />
                </label>
                <span className="register__input-error">{errors.password}</span>
                <button
                  type="submit"
                  className={`register__button ${!isValid && "register__button_disable"
                    }`}
                  disabled={!isValid}
                >
                  Зарегистрироваться
                </button>
                <div className="register__text">
                  Уже зарегистрированы?
                  <Link className="register__link" to="/signin">Войти</Link>
                </div>
              </form>
            </div>
          )}
        </section>) : (
        <Redirect to="./" />
      )
      }
    </div >
  );
}


export default Register;
