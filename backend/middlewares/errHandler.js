const errHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: statusCode === 500 ? 'ошибка сервера' : message });
  next();
};

module.exports = errHandler;
