import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
  const payload = { id: userId };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export default generateToken;
