import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthPage from "./pages/AuthPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect } from "react";
import { getUserObj } from "./actions/userActions";
import MainPage from "./pages/MainPage";

function App() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getUserObj(token));
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        {!userInfo ? (
          <>
            <Route exact path="/" component={AuthPage} />
            <Route exact path="/register" component={RegisterPage} />
          </>
        ) : (
          <>
            <Route exact path="/" component={MainPage} />
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
