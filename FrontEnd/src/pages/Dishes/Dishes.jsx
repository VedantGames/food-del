import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import axios from 'axios';

function Dishes() {
  const {user} = useContext(UserContext);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    axios.get('dishes/'+user._id).then(({data}) => {
      if (data) {
        setDishes(data);
      }
    });
  }, [user._id])

  return (
    <div>
      <div style={{marginTop: "1rem", display: "flex", flexDirection: "column", gap: "1rem"}}>
        {dishes && dishes.map(dish => (
          <div key={dish._id} style={{backgroundColor: "tomato", borderRadius: "1rem", overflow: "hidden", height: "15rem", color: "white"}}>
            <div style={{display: "flex"}}>
              <div style={{height: "100%", width: "20rem"}}>
                <img src={"http://localhost:4000/DishImages/"+dish.images[0]} alt="" style={{height: "100%", width: "100%", objectFit: "cover"}} />
              </div>
              <div style={{padding: "1rem", paddingTop: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                <div>
                  <p style={{fontSize: "2.5rem"}}>{dish.name}</p>
                  <p style={{fontSize: "1.5rem", paddingLeft: "0.5rem"}}>{dish.description}</p>
                </div>
                <p style={{paddingBottom: "1rem", fontSize: "2rem"}}>${dish.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dishes
