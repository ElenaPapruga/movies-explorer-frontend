// Profile — компонент страницы изменения профиля

import React from "react";
import "./Profile.css";
import Header from "../Header/Header";

function Profile(props) {
  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <section className="profile">
        <div className="profile__container">
          <h3 className="profile__wellcome">Привет, Друг!</h3>
          <form className="profile__edit-form">
            <label className="profile__unit">
              Имя
              <input className="profile__input" name='name' type="text" placeholder='Имя' />
            </label>
            <hr className="profile__meredian" />
            <label className="profile__unit">
              Почта
              <input className="profile__input" name='email' type="email" placeholder='Email' />
            </label>
          </form>
          <div className="profile__buttons-container">
            <button type="submit" className="profile__button">
              Редактировать
            </button>
            <button type="button" className="profile__button profile__button_logout" onClick={props.onSignOut}>
              Выйти из аккаунта
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;