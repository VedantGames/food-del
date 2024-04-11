import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets/assets";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpAsResturant, setSignUpAsResturant] = useState(false);
  const {setUser} = useContext(UserContext);

  function handleSign(e, currState, userName, userEmail, password, signUpAsResturant) {
    e.preventDefault();
    if (currState === "Sign Up") {
      axios.post('sign-up', {userName, userEmail, password, signUpAsResturant})
      .then(({data}) => {
        setUser(data);
        setShowLogin(false)
      })
      .catch(e => console.error(e));
    } else {
      axios.post('sign-in', {userEmail, password})
      .then(({data}) => {
        if (data.message == "Wrong password") {
          alert(data.message);
        } else {
          setUser(data);
          setShowLogin(false)
        }
      })
      .catch(e => console.error(e));
    }
  }

  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState !== "Login" && (
            <input 
              type="text" 
              value={userName} 
              onChange={(e) => setUserName(e.target.value)} 
              placeholder="Your name" 
              required 
            />
          )}
          <input 
            type="email" 
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)} 
            placeholder="Your email" 
            required 
          />
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password" 
            required 
          />
        </div>
        {currState === "Sign Up" && (
          <div>
            <input
              type="checkbox"
              value={signUpAsResturant}
              onChange={(e) => setSignUpAsResturant(e.target.checked)}
            />
              Sign Up as Resturant
          </div>
        )}
        <button onClick={(e) => handleSign(e, currState, userName, userEmail, password, signUpAsResturant)}>{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy </p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
