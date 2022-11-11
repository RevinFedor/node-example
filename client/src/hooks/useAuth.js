import jwtDecoded from "jwt-decode";
import { useState } from "react";

const useAuth = () => {
  const token = localStorage.getItem("token");

  if (token) {
    const decoded = jwtDecoded(token);
    const { username } = decoded;


  }


};
export default useAuth;