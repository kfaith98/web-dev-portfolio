import User from '../models/User.js';

export const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMe = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findById(req.user._id);

    if (username) {
      const existingUser = await User.findOne({
        username: username.toLowerCase().trim(),
        _id: { $ne: req.user._id },
      });
      if (existingUser) {
        return res.status(409).json({ message: 'Username already registered' });
      }
      user.username = username;
    }

    if (password) {
      user.password = password;
    }

    await user.save();

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(200).json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};
