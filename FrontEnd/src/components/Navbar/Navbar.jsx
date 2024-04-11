import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets/assets";
import { Link } from "react-router-dom";
import {StoreContext} from "../../context/StoreContext"
import { UserContext } from "../../context/UserContext";

const Navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("home");
  const {user} = useContext(UserContext)

  const {getTotalCartItems} = useContext(StoreContext);

  return (
    <>
      <div className="navbar">
        <Link to="/"><img src={assets.logo} alt="" className="logo" /></Link>
        <ul className="navbar-menu">
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            home
          </Link>
          <a
            href="#explore-menu"
            onClick={() => setMenu("menu")}
            className={menu === "menu" ? "active" : ""}
          >
            menu
          </a>
          <a
            href="#app-download"
            onClick={() => setMenu("mobile-app")}
            className={menu === "mobile-app" ? "active" : ""}
          >
            mobile-app
          </a>
          <a
            href="#footer"
            onClick={() => setMenu("contact-us")}
            className={menu === "contact-us" ? "active" : ""}
          >
            contact us
          </a>
        </ul>
        <div className="navbar-right">
          <img src={assets.search_icon} alt="" />
          <div className="navbar-search-icon">
            <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
            <div className={getTotalCartItems()===0?"":"dot"}>{getTotalCartItems()===0?"":getTotalCartItems()}</div>
          </div>
          {user ? (
            <Link to={'/account'} >{user.name}</Link>
          ) : (
            <button onClick={()=>setShowLogin(true)}>sign in</button>
          )}
        </div>
      </div>
      <hr />
    </>
  );
};

export default Navbar;
