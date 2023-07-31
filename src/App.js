import React from 'react';
import './App.css'
import HomePage from "./pages/home/HomePage";
import SignUpPage from "./pages/signup/SignUpPage";
import LoginPage from "./pages/login/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const UserContext = createContext();
const App = () => {

  const [userLoggedIn, setUserLoggedIn] = useState();
  const [modalToShow, setModalToShow] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [filterSelected, setFilterSelected] = useState();
  const [sortBy, setSortBy] = useState();
  const [updateAvailable, setUpdateAvailable] = useState();

  const [filterUpdateAvailable, setFilterUpdateAvailable] = useState();
  useEffect(() => {

    const isUserLoggedIn = () => {

      const currUser = JSON.parse(localStorage.getItem('feedbackUser'));
      if (currUser) {
        setUserLoggedIn(true);
      }
      else {
        setUserLoggedIn(false);
      }
    }

    isUserLoggedIn();
    setFilterSelected('All');
    setSortBy('Select');
    setUpdateAvailable(false);
  }, [])



  return (
    <UserContext.Provider
      value={{
        userLoggedIn, setUserLoggedIn,
        modalToShow, setModalToShow,
        showModal, setShowModal,
        filterSelected, setFilterSelected,
        sortBy, setSortBy,
        updateAvailable, setUpdateAvailable,

        filterUpdateAvailable, setFilterUpdateAvailable
      }}
    >


      <div>
        <BrowserRouter>
          <Routes >
            <Route path="/" element={<HomePage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer position="top-center" autoClose={false} closeOnClick />
      </div>
    </UserContext.Provider>
  );
}

export default App;
export { UserContext };