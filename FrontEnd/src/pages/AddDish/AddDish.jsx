import axios from 'axios';
import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext';

function AddDish() {
  const {user} = useContext(UserContext);
  const [name, setName] = useState('');
  const [discription, setDiscription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [addedImages, setAddedImages] = useState([]);
  const [catagory, setCatagory] = useState('');
  const [price, setPrice] = useState(0);
  const [redirect, setRedirect] = useState(false);

  function addImgUrl(e) {
    e.preventDefault();
    axios.post('upload-img-url', {imgUrl}).then(({data}) => {
      setAddedImages([...addedImages, data.url]);
      setImgUrl('');
    })
  }

  function saveDish(e) {
    e.preventDefault();
    console.log({owner: user._id}, user);
    axios.post('save-dish', {owner:user._id, name, discription, addedImages, catagory, price}).then(({data}) => data == "success" && setRedirect(true));
  }

  function uploadPhoto(e) {
    const files = e.target.files;
    const data = new FormData();
    
    for (let i = 0; i < files.length; i++) {
      data.append('file', files[i]);
    }

    axios.post('upload', data).then(({data:fileName}) => {
      setAddedImages([...addedImages, ...fileName]);
    })
  }

  if (redirect) return <Navigator to="account/dishes" />

  return (
    <div>
      <form action="">
        <div>
          <p>Dish name</p>
          <input 
            type="text" 
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='Name' 
          />
        </div>
        <div>
          <p>Discription</p>
          <input 
            type="text" 
            value={discription}
            onChange={e => setDiscription(e.target.value)}
            placeholder='Discription' 
          />
        </div>
        <div>
          <p>Images</p>
          <input 
            type="text" 
            value={imgUrl}
            onChange={e => setImgUrl(e.target.value)}
            placeholder='Add using a link' 
          />
          <button onClick={e => addImgUrl(e)}>Add image</button>
          <div style={{marginTop: "1rem", display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: "0.5rem"}}>
            {addedImages.length > 0 && addedImages.map(image => (
              <div style={{height: "13rem", borderRadius: "1rem", overflow: "hidden"}}>
                <img src={"http://localhost:4000/DishImages/"+image} alt="" style={{height: "100%", width: "100%"}} />
              </div>
            ))}
            <div>
              <label style={{cursor: "pointer", color: "rgb(75, 85, 99)", display: "flex", alignItems: "center", justifyContent: "center", height: "13rem", border: "1px solid gray", borderRadius: "1rem"}}>
                  <input type="file" multiple  style={{display: "none"}} onChange={uploadPhoto}/>
                  + Upload
              </label>
            </div>
          </div>
        </div>
        <div>
          <h3>Catagory</h3>
          <select 
            value={catagory}
            onChange={e => setCatagory(e.target.value)}
          >
            <option value="">Select a catagory</option>
            <option value="salad">Salad</option>
            <option value="roll">Roll</option>
            <option value="desert">Desert</option>
            <option value="sandwitch">Sandwitch</option>
            <option value="cake">Cake</option>
            <option value="pureveg">Pure Veg</option>
            <option value="pasta">Pasta</option>
            <option value="noodle">Noodle</option>
          </select>
        </div>
        <div>
          <h1>Price</h1>
          <input 
            type="number" 
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder='Price $' 
          />
        </div>
        <button 
          type='submit'
          onClick={saveDish}
        >Add Dish</button>
      </form>
    </div>
  )
}

export default AddDish
