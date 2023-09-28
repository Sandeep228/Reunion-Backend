const User = require("../models/userSchema");
const Property = require("../models/propertySchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      message: "Login Successful",
      name: user.name,
      email: user.email,
      token: token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const propertyInsertion = async (req, res) => {
  const {
    imageUrl,
    propertyName,
    address,
    rent,
    noofBeds,
    noofBathroom,
    area,
    availableFrom,
  } = req.body;

  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newProperty = new Property({
      id: user._id,
      imageUrl,
      propertyName,
      address,
      rent,
      noofBeds,
      noofBathroom,
      area,
      availableFrom: new Date(availableFrom),
    });
    await newProperty.save();

    res.status(201).json({ message: "Property added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const propertyUpdation = async (req, res) => {
  const { propertyId } = req.body;

  const {
    imageUrl,
    propertyName,
    address,
    rent,
    noofBeds,
    noofBathroom,
    area,
    availableFrom,
  } = req.body;

  try {
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    property.imageUrl = imageUrl;
    property.propertyName = propertyName;
    property.address = address;
    property.rent = rent;
    property.noofBeds = noofBeds;
    property.noofBathroom = noofBathroom;
    property.area = area;
    property.availableFrom = availableFrom;

    await property.save();

    return res.status(200).json({ message: "Property updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const propertyDeletion = async (req, res) => {
  try {
    const { propertyId } = req.body;
    const existingProperty = await Property.findById(propertyId);

    if (!existingProperty) {
      return res.status(404).json({ message: "Property  not found" });
    }
    await existingProperty.deleteOne({ _id: propertyId });

    return res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllPropertyReports = async (req, res) => {
  try {
    const properties = await Property.find();
    console.log(properties);
    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserPropertyDetails = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const PropertyReports = await Property.find({ id: user._id });
    console.log(PropertyReports);
    return res.status(200).json(PropertyReports);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  login,
  signup,
  propertyInsertion,
  propertyUpdation,
  propertyDeletion,
  getAllPropertyReports,
  getUserPropertyDetails,
};
