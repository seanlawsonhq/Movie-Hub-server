const User = require("../models/user"); // internal
const bcrypt = require("bcryptjs"); // external
const jwt = require("jsonwebtoken");
const customError = require("../utils/customError"); //internal

// ======== Controller for sign-up /Register a New User=====

const register = async (req, res, next) => {
  console.log(req.body);

  const { email, password, repeatPassword } = req.body;

  if (!email) {
    // return res.status(400).json({ message: "Please Provide an email address" });
    return next(customError("Please provide an email address", 400));
  }

  if (!password) {
    // return res.status(400).json({ message: "Please provide a password" });
    return next(customError("Please provide a password", 400));
  }

  if (password !== repeatPassword) {
    // return res.status(400).json({ message: "Password does not match" });
    return next(customError("Password does not match", 400));
  }

  // ==========================================================
  // bcrypt - for hashing and unhashing passwords

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({ email, password: hashedPassword });
    return res.status(201).json({ message: "User Created" });
  } catch (error) {
    // return res.status(500).json({ message: error });

    if (error.code === 11000 && error.keyValue.email) {
      return next(customError("Email already exists", 401));
      console.log(error, code);
      console.log(error.keyValue.email);

      return next(customError("Email ALready Exists", 401));
    }

    if (error.errors.email.message) {
      return next(customError(error.errors.email.message, 400));
    }
    next(customError("Something went wrong", 500));
  }
};

//======= Controller to log in an existing User========

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return next(customError("Please provide an email address", 400));
  }

  if (!password) {
    return next(customError("Please provide a password", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(customError("User does not exist", 401));
  }

  const doesPasswordMatch = await bcrypt.compare(password, user.password);

  if (!doesPasswordMatch) {
    return next(customError("Wrong password", 400));
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRETS, {
    expiresIn: "2d",
  });

  res.status(200).json({ message: "Login successfully", token });
};

//==========Controller to get users based on valid token=========

const getUser = (req, res, next) => {
  const {userId} = req.user
  res.status(200).json({id: userId});
};

module.exports = { register, login, getUser };
