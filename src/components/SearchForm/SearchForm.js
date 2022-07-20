import React from "react";
import "./SearchForm.css";

function SearchForm() {
  return (
    <section className="search">
      <div className="search__wrapper">
        <form className="search__form">
          <div className="search__wrapper-input-box">
            <input className="search__input" type="text" name="keyword" placeholder='Фильм' minLength="2" maxLength="200" required />
          </div>
          <div className="search__image-lupa"></div>
          <button className="search__button"></button>
          <div className="search__border"></div>
          <div className="search__filter">
            <input type="checkbox" className="search__checkbox" name="filter__film" />
            <p className="filter__text">Короткоментражки</p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
