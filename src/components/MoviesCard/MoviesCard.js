import "./MoviesCard.css";
import React from 'react';
import preview from "../../images/film1.svg";
import { Route, Switch } from "react-router-dom";


function MoviesCard() {
  return (
    <div className="movies-card">
      <div className="movies-card__wrapper">
        <div className="movie-card__info">
          <div className="movies-card__name">33 слова о дизайне</div>
          <p className="movies-card__time">1ч 47м</p>
        </div>
        <Switch>
          <Route path="/movies">
            <button
              className="movies-card__save-button movies-card__save-button_active"
              type="button"
            ></button>
          </Route>
          <Route path="/saved-movies">
            <button
              className="movies-card__save-button movies-card__delete-button"
              type="button"
            ></button>
          </Route>
        </Switch>
      </div>
      <img className="movies-card__images" alt="Прекрасный фильм" src={preview} />
    </div>
  );
}

export default MoviesCard;
