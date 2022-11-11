import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useCreateUserMutation } from "../users/usersApiSlice";


const SingUp = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [status, setstatus] = useState("");

  const dispatch = useDispatch();


  const [createNewUser, { isError, isLoading }] = useCreateUserMutation();

  const submithandler = async (e) => {
    e.preventDefault();
    try {
      await createNewUser({ username, password }).unwrap();
    

      setusername("");
      setpassword("");
      setstatus('Пользователь успешно создан');
      
    } catch (error) {
      setstatus(error.data.message);
    }
    
  };

  return (
    <div className="register">
      <h1>Регистрация</h1>
      {status && <h5>{status}</h5>}
      <form action="submit">
        <input
          onChange={(e) => setusername(e.target.value)}
          type="text"
          placeholder="Введите ваш емаил"
        />
        <input
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Введите ваш пароль"
          type="password"
        />
        <button onClick={submithandler} type="submit">
          Заргестрироваться
        </button>
      </form>
    </div>
  );
};

export default SingUp;
