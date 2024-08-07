const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const registerUser = async (email, password, role) => {
  let user = await User.findOne({ email });
  if (user) {
    throw new Error('User already exists');
  }

  user = new User({ email, password, role });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();

  const payload = {
    user: {
      id: user.id,
      role: user.role,
      email:user.email
    },
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 });

  return token;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }
  

  const payload = {
    user: {
      id: user.id,
      role: user.role,
      email:user.email
    },
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 });

  return [token,user];
};

module.exports = {
  registerUser,
  loginUser,
};
