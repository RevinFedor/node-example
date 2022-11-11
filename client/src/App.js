import Header from "./components/Header";
import { Routes,Route } from "react-router-dom";
import UserList from "./features/users/UserList";
import LandingPage from "./components/LandingPage";
import Login from "./features/auth/Login";
import SingUp from "./features/auth/SingUp";
import Requireauth from "./features/auth/RequireAuth";
import { useDispatch } from "react-redux";
import { setCredentials } from "./features/auth/authSlice";
import Notes from "./features/notes/NewNote";
import NotesList from "./features/notes/NotesList";


const App = () => {
  const dispatch = useDispatch()
  // проверка логина
  const accessToken = localStorage.getItem("token")
  if (accessToken) dispatch(setCredentials(accessToken));

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<SingUp />} />
        {/* protected routes */}
        <Route element={<Requireauth />}>
          <Route path="/userlist" element={<UserList />} />
          <Route path="/noteslist" element={<NotesList />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
