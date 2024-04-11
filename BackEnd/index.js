const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcryptjs');
const imageDownloader = require('image-downloader');
const fs = require('fs');
const multer = require('multer');
const cors = require('cors');

const User = require('./Models/Users');
const Dishes = require('./Models/Dishes');
const Cart = require('./Models/Cart');

const app = express();
mongoose.connect("mongodb+srv://guptavedant2549:YjH8b1GcI7sPUkpf@tomatodb.sl3bshm.mongodb.net/?retryWrites=true&w=majority&appName=TomatoDB");

app.use(express.json());
app.use(cors({
  credentials: true,
  origin: 'https://tomato-ten.vercel.app',
}));
app.use('/DishImages', express.static(__dirname+'/DishImages'))

app.get('/', (req, res) => {
  res.send('<body style="color: #d9d9d9; background-color: darkslategray"><div style="text-align: center; font-family: monospace"><h1 style="margin-top: 3rem; font-size: 3rem">Hello World</h1>If you can se "Hello World" up here, it means that this server is running...</div></body>');
});

app.post('/sign-up', async (req,res)=>{
  const {userName, userEmail, password, signUpAsResturant} = req.body;

  try {
    res.json( await User.create({
      name: userName,
      email: userEmail,
      password: bcrypt.hashSync(password),
      signUpAsResturant: signUpAsResturant
    }));
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post('/sign-in', (req,res) => {
  const {userEmail, password:userPassword} = req.body;

  User.findOne({email: userEmail})
  .then(({_id, name, email, signUpAsResturant, password}) => {
    if (bcrypt.compareSync(userPassword, password)) {
      res.json({
        _id,
        name,
        email,
        signUpAsResturant
      });
    } else {
      res.json({
        message: "Wrong password"
      });
    }
  })
  .catch(e => console.log(e));
});

app.post('/upload-img-url', async (req, res) => {
  const {imgUrl:link} = req.body;
  const fileName = 'Image' + Date.now() + '.jpeg';
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/DishImages/' + fileName,
  });
  res.json({
    url: fileName,
  });
});

const photoMiddleware = multer({dest:'DishImages/'});
app.post('/upload', photoMiddleware.array('file', 100), (req,res) => {
  const files = [];
  for (let i = 0; i < req.files.length; i++) {
    const {path, originalname} = req.files[i];
    const broken = originalname.split('.');
    const ext = broken[broken.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    files.push(newPath.replace("DishImages\\", ""));
  }
  res.json(files)
});

app.post('/save-dish', (req, res) => {
  const {owner, name, discription, addedImages, catagory, price} = req.body;
  console.log(owner);
  Dishes.create({
    owner: owner,
    name: name,
    description: discription,
    images: addedImages,
    catagory: catagory,
    price: price
  }).then(res.json("success"));
});

app.get('/dishes/:id', async (req, res) => {
  const {id:owner} = req.params;
  res.json( await Dishes.find({owner:owner}));
});

app.get('/all-food-items', async (req, res) => {
  res.json( await Dishes.find() );
});

app.post('/add-to-cart', async (req, res) => {
  const {itemId, owner} = req.body;
  Cart.find({owner: owner}).then((data) => {
    if (data[0] != [][0]) {
      if (data[0].items.filter(item => item.id == itemId)[0] != [][0]) {
        Cart.findOneAndUpdate({owner: owner, 'items.id': itemId}, {
          $inc: {
            'items.$.quantity': 1
          }
        }).then(() => Cart.findOne({owner: owner}).then(responce => res.json(responce) ));
      } else {
        Cart.findOneAndUpdate({owner: owner}, {
          $push: {
            items: [
              {
                id: itemId,
                quantity: 1,
              }
            ]
          }
        }).then(() => Cart.findOne({owner: owner}).then(responce => res.json(responce) ));
      }
    } else {
      Cart.create({
        owner: owner,
        items: [
          {
            id: itemId,
            quantity: 1,
          }
        ],
      }).then(responce => res.json(responce));
    }
  })
});

app.post('/remove-from-cart', (req, res) => {
  const {itemId, owner} = req.body;
  Cart.findOne({owner: owner}).then((data) => {
    if (data.items.filter(item => item.id === itemId)[0].quantity > 1) {
      Cart.findOneAndUpdate({owner: owner, 'items.id': itemId}, {
        $inc: {
          'items.$.quantity': -1
        }
      }).then(() => Cart.findOne({owner: owner}).then(responce => res.json(responce) ));
    } else if (data.items.filter(item => item.id === itemId)[0].quantity == 1) {
      Cart.findOneAndUpdate({owner: owner}, {
        $pull: {
          items: {
            id: itemId
          }
        }
      }).then(() => Cart.findOne({owner: owner}).then(responce => res.json(responce) ));
    }
  })
});

app.listen(4000);