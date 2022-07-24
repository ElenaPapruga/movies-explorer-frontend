// Movies — компонент страницы с поиском по фильмам

import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies(props) {
  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main>
        <SearchForm />
        <MoviesCardList />
      </main>

      <Footer />
    </>
  );
}

export default Movies;