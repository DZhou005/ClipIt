import React, { useState } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { login } from "../../store/session";
import './loginform.css'

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className='loginFormContainer'>
      <form onSubmit={onLogin}>
        <div className='loginError'>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div className='loginFormInner'>
          <h1 className='welcome'>Welcome Back</h1>
          <div className='loginFormEmail'>
            <label htmlFor="email">Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='loginFormPassword'>
            <label htmlFor="password">Password&nbsp;</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div>
            <button className='loginFormSubmit' type="submit">Login</button>
        </div>
            <NavLink to='/sign-up' className='signupLink'>Don't have an account? Signup here</NavLink>
      </form>
    </div>
  );
};

export default LoginForm;
