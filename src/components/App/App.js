import React from "react";
import Main from "../Main/Main";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import NotFound from "../NotFound/NotFound";
import SavedMovies from "../SavedMovies/SavedMovies";
import { Route, Switch, useHistory, useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });

  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (loggedIn === true) {
      history.push("/movies");
    }
  }, [loggedIn]);

  function signOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/signin");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        {/* Switch - компонет для отрисовки одного компонента Route */}
        <Switch>
          {/* пропс exact гарантирует, что значение пропса path будет сравниваться с путем url */}
          <Route exact path="/">
            <Main loggedIn={loggedIn} />
          </Route>

          <Route path="/signup">
            <Register />
          </Route>

          <Route path="/signin">
            <Login />
          </Route>

          <ProtectedRoute component={Profile} onSignOut={signOut} path="/profile" loggedIn={loggedIn} />
          <ProtectedRoute component={Movies} path="/movies" loggedIn={loggedIn} />
          <ProtectedRoute component={SavedMovies} path="/saved-movies" loggedIn={loggedIn} />
          {/* - для всех остальных комбинаций для страницы 400 */}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
