import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthPage from "./pages/AuthPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect } from "react";
import { getUserObj } from "./actions/userActions";
import MainPage from "./pages/MainPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProfilePage from "./pages/ProfilePage";
import ClassPage from "./pages/ClassPage";

function App() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getUserObj(token));
  }, [dispatch]);

  return (
    <Router>
      {!userInfo ? (
        <>
          <Switch>
            <Route exact path="/" component={AuthPage} />
            <Route path="/:isRegister" component={AuthPage} />
          </Switch>
        </>
      ) : (
        <>
          <Header />
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/profile/:id" component={ProfilePage} />
            <Route path="/class/:classId" component={ClassPage} />
          </Switch>
        </>
      )}
      <Footer />
    </Router>
  );
}

export default App;
