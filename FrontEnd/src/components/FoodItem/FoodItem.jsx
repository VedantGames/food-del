import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, owner, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt="" />
        {cartItems.filter(value => value.id == id)[0] == [][0] ? (
          <img
            className="add"
            onClick={() => addToCart(id, owner)}
            src={assets.add_icon_white}
            alt=""
            />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id, owner)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems.filter(value => value.id == id)[0].quantity}</p>
            <img
              onClick={() => addToCart(id, owner)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          {name}
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
