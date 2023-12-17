import React from "react";
import { ChatIcon } from "./svg";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
//Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./features/userSlice";

function App() {
  const { user } = useSelector((state) => state.user);
  console.log("user -->", user);

  return (
    <div className="dark">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
