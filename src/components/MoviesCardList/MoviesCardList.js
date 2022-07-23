// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством

import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { Route, Switch } from "react-router-dom";

function MoviesCardList() {
  return (
    <section className="movies-card-list">
      <div className="movies-card-list__elements">
        <MoviesCard />
      </div>
      <Switch>
        <Route path="/movies">
          <button className="movies-card-list__button" type="button" > Ещё </button>
        </Route>
        <Route path="/saved-movies">
          <button className="movies-card-list__button movies-card-list__button-hidden" type="button" > Ещё </button>
        </Route>
      </Switch>
    </section>
  );
}

export default MoviesCardList;