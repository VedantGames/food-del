import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [food_list, setFoodList] = useState([]);
  
  axios.get('all-food-items').then(({data}) => setFoodList(data))


  async function addToCart(itemId, owner) {
    const {data:cart} = await axios.post('add-to-cart', {itemId, owner});
    setCartItems(cart.items);
  };

  async function removeFromCart(itemId, owner) {
    const {data:cart} = await axios.post('remove-from-cart', {itemId, owner});
    setCartItems(cart.items);
  };

  const getTotalCartAmount = () => {
    if (cartItems[0] != [][0] && food_list[0] != [][0])
      return cartItems.map(value => value.quantity).map((value, index) => value*food_list.map(value => value.price)[index]).reduce((a, b) => a+b);
    else 
      return 0;
  };

  const getTotalCartItems = () => {
    return cartItems.length;
  }

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
