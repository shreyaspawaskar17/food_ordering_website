const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
    enum: ['full', 'half']
  },
  price: {
    type: Number,
    required: true
  }
});

const foodSchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  options: {
    type: [optionSchema],
    required: true,
    validate: [arrayLimit, '{PATH} exceeds the limit of 2'] 
  }
}, {
  timestamps: true
});

function arrayLimit(val) {
  return val.length === 2; 
}

const Food = mongoose.model('fooditems', foodSchema);

module.exports = Food;
