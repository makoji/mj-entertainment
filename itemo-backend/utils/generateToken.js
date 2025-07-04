const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  // Replace 'YOUR_JWT_SECRET' with a long, random string
  return jwt.sign({ id }, 'thisisasecret', {
    expiresIn: '30d', // Token expires in 30 days
  });
};

module.exports = generateToken;
