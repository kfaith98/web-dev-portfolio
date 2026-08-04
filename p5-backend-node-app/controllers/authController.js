import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import generateToken from '../utilities/generateToken.js';

const INVALID_CREDENTIALS = 'Invalid username or password';

export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: 'Username and password required',
      });
    }

    const existingUser = await User.findOne({
      username: username.toLowerCase().trim(),
    });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already registered' });
    }

    const savedUser = await User.create({ username, password });

    const userWithoutPassword = savedUser.toObject();
    delete userWithoutPassword.password;

    res.status(201).json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Username and password are required' });
    }

    const user = await User.findOne({
      username: username.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(401).json({ message: INVALID_CREDENTIALS });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: INVALID_CREDENTIALS });
    }

    if (!user.isActive) {
      return res.status(401).json({ message: INVALID_CREDENTIALS });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: userWithoutPassword,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
