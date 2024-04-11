const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishesSchema = new Schema({
  owner: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  catagory: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Dishes = mongoose.model('Dishes', dishesSchema);

module.exports = Dishes;