import React, { Fragment, useState, useEffect } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Route,
  Routes,
  Navigate
} from "react-router-dom";


//components

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

// toast.configure();

function App() {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:80/auth/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <div className="container">
        <ToastContainer />
        <Routes>
          <Route
            exact
            path="/"
            element={
              !isAuthenticated ? (
                <Login setAuth={setAuth} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/register"
            element=
            {
              !isAuthenticated ? (
                <Register setAuth={setAuth} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard setAuth={setAuth} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;
