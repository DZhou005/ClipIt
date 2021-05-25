import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
// import { authenticate } from "./services/auth";
import { authenticate } from "./store/session";
import Upload from "./components/upload/upload"
import Profile from "./components/profile/profile"
import Clip from "./components/clip/clip"
import AllClip from "./components/home/home"
import Edit from "./components/edit/edit"


function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/profile/:name' exact={true}>
          <NavBar/>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path='/clips/:id' exact={true}>
          <NavBar/>
          <Clip/>
        </ProtectedRoute>
        <ProtectedRoute path="/upload" exact={true}>
          <NavBar/>
          <Upload/>
        </ProtectedRoute>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/edit/:id' exact={true}>
          <Edit />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <NavBar/>
          <AllClip/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
