// SavedMovies — компонент страницы с сохранёнными карточками фильмов

import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies(props) {
  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <main>
        <SearchForm />
        <div className="saved-movies">
          <MoviesCardList />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
