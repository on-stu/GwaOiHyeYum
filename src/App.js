import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthPage from "./pages/AuthPage";
import { useEffect } from "react";
import { getUserObj } from "./actions/userActions";
import MainPage from "./pages/MainPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ClassPage from "./pages/ClassPage/ClassPage";
import QuizMaker from "./pages/QuizPage/QuizMaker";
import QuizSolve from "./pages/QuizPage/QuizSolve";
import QuizInfo from "./pages/QuizPage/QuizInfo";

function App() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getUserObj(token));
  }, [dispatch, token]);

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
            <Route path="/quizMaker" component={QuizMaker} />
            <Route path="/quizSolve/:quizId" component={QuizSolve} />
            <Route path="/quizInfo/:quizId" component={QuizInfo} />
          </Switch>
        </>
      )}
      <Footer />
    </Router>
  );
}

export default App;
