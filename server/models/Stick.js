const mongoose = require('mongoose');

const StickSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 1000,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
      max: 1000,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Stick', StickSchema);