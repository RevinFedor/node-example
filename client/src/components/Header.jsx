import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut, selectCurrentToken, selectCurrentUser } from "../features/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();

  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);


  const logOutHandler = () => {
    dispatch(logOut());
  };
  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <div className="header__logo">
            <Link to="/">TechNotes</Link>
          </div>
          <div className="header__links">
            <Link to='/noteslist'>New Notes</Link>
            <a>My notes</a>
            <a>Favourite</a>
            <Link to="/userlist">Admin</Link>
          </div>
          <div className="header__auth">
            {token ? (
              <>
                <a>{user}</a>
                <a onClick={logOutHandler}>Выйти</a>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/singup" className="header-active">
                  Sing Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
