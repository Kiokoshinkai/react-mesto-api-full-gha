require('dotenv').config();

const jwt = require('jsonwebtoken');
const UnauthorizedErr = require('../errors/UnauthorizedErr');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedErr('Необходимо авторизоваться'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    return next(new UnauthorizedErr('Необходимо авторизоваться'));
  }
  req.user = payload;
  return next();
};

module.exports = {
  auth,
};
