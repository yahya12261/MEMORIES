import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/authComponents/login";
import Registration from "./components/authComponents/registration";
import Core from "./components/core/core";
import { useEffect, useState } from "react";
import authService from "./Services/authServices/auth.service";
import NotFound from "./components/notFound";
import ShowPost from "./components/core/ShowPost/ShowPost";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    authService.logout();
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Registration" element={<Registration />} />
        {currentUser && <Route exact path="/core" element={<Core />} />}
        {currentUser && (
          <Route exact path="/core/post" element={<ShowPost />} />
        )}
        {!currentUser && <Route exact path="/core" element={<NotFound />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
