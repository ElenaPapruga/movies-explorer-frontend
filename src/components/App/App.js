import React from 'react';
import { useState, useEffect } from "react";
import Main from "../Main/Main";
import { IngredientsContext } from "../../services/IngredientsContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import NotFound from "../NotFound/NotFound";
import SavedMovies from "../SavedMovies/SavedMovies";
import { Route, Switch, useLocation, useHistory, useNavigate } from "react-router-dom";
import useLocalStorage from '../../services/useLocalStorage';
import api from "../../utils/MainApi";
import { getMovies } from "../../utils/MoviesApi";
import Preloader from '../Preloader/Preloader';

function App() {
  let location = useLocation().pathname;
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // стейт для прелоудера

  useEffect(() => {
    if (loggedIn === true) {
      history.push('/movies');
    }
  }, [history, loggedIn]);

  useEffect(() => {
    setTimeout(() => {
      handleTokenCheck();
    }, 100);
  }, [])

  // Проверка токена
  function handleTokenCheck() {
    const token = localStorage.getItem('jwt');
    if (token) {
      setIsLoading(true);
      api.getApiUserInfo(token)
        .then(
          (res) => {
            if (res) {
              setLoggedIn(true);
              setCurrentUser({
                name: res.user.name,
                email: res.user.email
              });
              // даём доступ к оснавным страницам
              history.push(location);
              showAllMovies();
              setIsLoading(false);
            }
          })
        .catch((err) => {
          console.log(`Не удалось получить токен: ${err}`)
          localStorage.removeItem('token');
          history.push('/');
          setIsLoading(false);
        })
    }
  };

  // Регистрация
  function handleRegister({ name, email, password }) {
    setIsLoading(true);
    api.createProfile(name, email, password)
      .then(
        (res) => {
          setIsLoading(false);
          if (res) {
            console.log(email, password)
            handleLogin({ email, password });
          }
        })
      .catch((err) => {
        console.log(`Не удалось пройти регистрацию: ${err}`)
        setIsLoading(false);
      })
  };

  // Функция входа
  function handleLogin({ email, password }) {
    setIsLoading(true);
    api.login(email, password)
      .then(
        (res) => {
          setIsLoading(false);
          if (res.token) {
            localStorage.setItem('jwt', res.token);
            setLoggedIn(true);
            history.push("/movies");
          }
        })
      .catch((err) => {
        setIsLoading(false);
        console.log(err)
      });
  };
  // function handleLogin(email, password) {
  //   setIsLoading(true);
  //   api.login(email, password)
  //     .then((res) => {
  //       setIsLoading(false);
  //       if (res.token) {
  //         localStorage.setItem("jwt", res.token);
  //         setLoggedIn(true);
  //         history.push("/movies");
  //         console.log('ok')
  //       }
  //     })
  //     .catch((err) => {
  //       setIsLoading(false);
  //       if (err.status === Number(400)) {
  //         alert('Не заполнено одно из полей')
  //       } else if (err.status === Number(401)) {
  //         alert('Неправильно введен логин или пароль')
  //       }
  //     });
  // }

  // Выход из аккаунта
  function signOut() {
    localStorage.clear();
    setLoggedIn(false);
    history.push('/')
  };

  // Изменение информации о пользователе
  function handleUpdateUser(data) {
    localStorage.getItem("jwt");
    setIsLoading(true);
    api.patchUserInfo(data)
      .then(
        (res) => {
          setCurrentUser(data);
          setIsLoading(false);
        })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  // Функция лайка карточки //
  function handleMovieLike(movie) {
    return saveMoviesAction.some((savedMovie) => savedMovie.movieId === movie.movieId);
  };
  // Сохраненные фильмы в локалсторидж
  const [saveMoviesAction, setSaveMoviesAction] = useLocalStorage(
    "save_movies_action",
    []
  );

  // Ошибка поиска
  const [showError, setShowError] = useState("");

  //стейт для филтрованных фильмов
  const [moviesAction, setMoviesAction] = useLocalStorage("movies_action", []); // для фильтрации фильмов
  const [value, setValue] = useLocalStorage("serach_value", "") // для  input по поиску
  const [valueSave, setValueSave] = useLocalStorage("serach_value_save", "");
  // const [newCard, setNewCard] = useState(numberMoviesAdd);
  const [movies, setMovies] = useLocalStorage("all_movies", []); // храним фильмы

  const showAllMovies = async () => {
    setIsLoading(true);
    const res = await getMovies();
    setIsLoading(false);
    const allMovies = res.map((data) => {
      const imageUrl = data.image
        ? `https://api.nomoreparties.co${data.image.url}`
        : "https://upload.wikimedia.org/wikipedia/commons/9/9a/%D0%9D%D0%B5%D1%82_%D1%84%D0%BE%D1%82%D0%BE.png";
      const thumbnailUrl = data.image
        ? `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`
        : "https://upload.wikimedia.org/wikipedia/commons/9/9a/%D0%9D%D0%B5%D1%82_%D1%84%D0%BE%D1%82%D0%BE.png";
      const unadaptedName = !data.nameEN ? data.nameRU : data.nameEN
      const countryText = !data.country ? 'none' : data.country;
      return {
        country: countryText,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: imageUrl,
        trailer: data.trailerLink,
        thumbnail: thumbnailUrl,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: unadaptedName,
      };
    });
    setMovies(allMovies);
  };

  // Взятие фильмов пользователя
  const takeFilm = async () => {
    const res = await api.getAllMovies();
    setSaveMoviesAction(res);
  };

  // Функция для сохранения фильма //
  const addedMovie = async (movie) => {
    console.log(movie)
    await api.createMovie(movie);
    takeFilm();
  };

  // Функция удаления фильма //
  const removeMovie = async (movie) => {
    console.log(movie)
    const id = saveMoviesAction.find((data) => data.movieId === movie.movieId)._id;
    await api.deleteMovie(id);
    takeFilm();
  };

  useEffect(() => {
    takeFilm();
  }, [isLoading]);

  useEffect(() => {
    if (loggedIn) showAllMovies();
    setShowError("");
  }, [loggedIn]);

  const showShortMovies = (moviesF) => {
    return moviesF?.filter((data) => data.duration <= 40);
  };

  const findByNameFilm = (movies, value) => {
    const res = movies.filter((data) =>
      data.nameRU.toLowerCase().includes(value.toLowerCase())
    );

    if (res.length === 0) {
      setShowError("Ничего не найдено");
    }
    return res;
  };

  const submitFindByNameSaveFilm = async (value) => {
    const res = await api.getAllMovies();
    showAllMovies();
    setSaveMoviesAction(findByNameFilm(res, value));
  };

  const submitFindByNameFilm = (value) => {
    showAllMovies();
    setMoviesAction(findByNameFilm(movies, value));
  };

  return (
    <IngredientsContext.Provider value={currentUser}>
      <div className="App">
        {/* Switch - компонет для отрисовки одного компонента Route */}
        <Switch>
          {/* пропс exact гарантирует, что значение пропса path будет сравниваться с путем url */}
          <Route exact path="/">
            <Main loggedIn={loggedIn} />
          </Route>
          {isLoading ? (
            <Preloader />
          ) : (
            <Route path="/signup">
              <Register onRegister={handleRegister} loggedIn={loggedIn} />
            </Route>
          )}

          {isLoading ? (
            <Preloader />
          ) : (
            <Route path="/signin">
              <Login onLogin={handleLogin} loggedIn={loggedIn} />
            </Route>
          )}
          <ProtectedRoute
            loggedIn={loggedIn}
            component={Profile}
            onSignOut={signOut}
            setIsLoading={setIsLoading}
            onEditProfile={handleUpdateUser}
            path="/profile"
          />
          <ProtectedRoute
            component={Movies}
            loggedIn={loggedIn}
            removeMovie={removeMovie}
            submitFindByNameFilm={submitFindByNameFilm}
            movies={moviesAction}
            showShortMovies={showShortMovies}
            addedMovie={addedMovie}
            handleMovieLike={handleMovieLike}
            value={value}
            setValue={setValue}
            showError={showError}
            setShowError={setShowError}
            path="/movies"
          />
          <ProtectedRoute
            component={SavedMovies}
            loggedIn={loggedIn}
            movies={saveMoviesAction}
            showShortMovies={showShortMovies}
            removeMovie={removeMovie}
            submitFindByNameFilm={submitFindByNameSaveFilm}
            handleMovieLike={handleMovieLike}
            value={valueSave}
            setValue={setValueSave}
            showError={showError}
            setShowError={setShowError}
            path="/saved-movies"
          />
          {/* - для всех остальных комбинаций для страницы 400 */}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </IngredientsContext.Provider>
  );
}

export default App;
