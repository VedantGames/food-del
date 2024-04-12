import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import LoginPopup from "./components/LoginPopup/LoginPopup"
import axios from "axios";
import { UserContextProvider } from "./context/UserContext";
import Account from "./pages/Account/Account";
import AddDish from "./pages/AddDish/AddDish";
import Dishes from "./pages/Dishes/Dishes";

axios.defaults.baseURL = 'https://tomato-server.vercel.app/';
axios.defaults.withCredentials = true;

const App = () => {

const [showLogin,setShowLogin] = useState(false)

  return (
    <UserContextProvider>
      {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/add-dish" element={<AddDish />} />
          <Route path="/account/dishes" element={<Dishes />} />
        </Routes>
      </div>
      <Footer />
    </UserContextProvider>
  );
};

export default App;
