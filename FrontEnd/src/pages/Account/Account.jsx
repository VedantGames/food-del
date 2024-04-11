import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import "./Account.css"
import { Link } from 'react-router-dom';

function Account() {
  const {user} = useContext(UserContext);

  return (
    <div className='accountPageContainer'>
      <div className='userNameContainer'>
        <h2 className='userNameLabel'>User name:</h2>
        <h1 className='userName'>{user.name}</h1>
      </div>
      <div className='emailContainer'>
        <h2 className='emailLabel'>User email:</h2>
        <h1 className='email'>{user.email}</h1>
      </div>
      {user.signUpAsResturant && (
        <div className='dishesBtnContaier'>
          <div className='viewDishesBtnContainer'>
            <Link to={'dishes'} className='viewDishesBtn' >View Dishes</Link>
          </div>
          <div className='addBtnContainer'>
            <Link to={'add-dish'} className='addBtn'>+ Add a dish</Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Account
