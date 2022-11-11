import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "./authApiSlice";
import { setCredentials, setToken } from "./authSlice";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [errMessage, setErrMessage] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMessage("");
  }, [username, password]);

  const submithandler = async (e) => {
    e.preventDefault();

    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials(accessToken));

      setusername("");
      setpassword("");
      navigate("/noteslist");
    } catch (err) {
      setErrMessage('Хуйня какая-то')
    }
  };

  return (
    <div className="register">
      <h1>Вход в систему</h1>
      {errMessage && <h5 ref={errRef}>{errMessage}</h5>}

      <form action="submit">
        <input
          ref={userRef}
          value={username}
          onChange={(e) => setusername(e.target.value)}
          type="text"
          placeholder="Введите ваш емаил"
        />
        <input
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Введите ваш пароль"
          type="password"
        />
        <button onClick={submithandler} type="submit">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
