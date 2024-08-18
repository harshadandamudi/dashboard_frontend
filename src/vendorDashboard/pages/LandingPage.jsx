import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Login from '../components/forms/Login';
import Register from '../components/forms/Register';
import AddFirm from '../components/forms/AddFirm';
import AddProduct from '../components/forms/AddProduct';
import Welcome from '../components/Welcome';
import AllProducts from '../components/AllProducts';
import './page.css';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const loginToken = localStorage.getItem('loginToken');
    if (loginToken) {
      setShowLogout(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("loginToken");
    localStorage.removeItem("firmId");
    setShowLogout(false);
  };

  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowFirm(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  };

  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowFirm(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  };

  const showFirmHandler = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowFirm(true);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  };

  const showProductHandler = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(true);
    setShowWelcome(false);
    setShowAllProducts(false);
  };

  const showWelcomeHandler = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(true);
    setShowAllProducts(false);
  };

  const showAllProductsHandler = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(true);
  };

  return (
    <div>
      <NavBar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} showLogout={showLogout}
        logoutHandler={logoutHandler} />
      <div className="landing-page">
        <SideBar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler}
          showAllProductsHandler={showAllProductsHandler} />
        {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
        {showRegister && <Register showLoginHandler={showLoginHandler} />}
        {showFirm && <AddFirm />}
        {showProduct && <AddProduct />}
        {showWelcome && <Welcome />}
        {showAllProducts && <AllProducts />}
      </div>
    </div>
  );
};

export default LandingPage;
