const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  imageUrl: {
    type: String,
  },
  propertyName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  availableFrom: {
    type: Date,
    required: true,
  },
  noofBeds: {
    type: Number,
    required: true,
  },
  noofBathroom: {
    type: Number,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
