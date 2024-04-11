import React, { useContext, useEffect, useId, useState } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  // const [foodList, setFoodList] = useState([]);
  const [userId, setUserId] = useState(null);
  const {user} = useContext(UserContext);

  useEffect(() => {
    setUserId(user?._id)
  }, [useContext(UserContext).user]);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list && food_list.map((item, index) => {
          {console.log(item)}
          if ((category === "All" || category === item.catagory)) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                owner={userId}
                name={item.name}
                description={item.description}
                price={item.price}
                image={'http://localhost:4000/DishImages/' + item.images[0]}
                category={item.category}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
