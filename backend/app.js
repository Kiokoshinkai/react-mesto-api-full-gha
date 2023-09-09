const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
// const path = require('path');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const { login, createUser } = require('./controllers/users');
const urlRegex = require('./utils/regex');
const { auth } = require('./middlewares/auth');
const errHandler = require('./middlewares/errHandler');
const NotFoundErr = require('./errors/NotFoundErr');

// подключаемся к серверу mongo
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

const allowedOrigins = [
  'localhost:3000',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

app.use(helmet());
app.use(requestLogger); // Подключить логгер запросов
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'build')));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlRegex),
  }),
}), createUser);

app.use(auth);
// подключаем маршруты для пользователей и карточек
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res, next) => {
  const err = new NotFoundErr('Ресурс не найден');
  next(err);
});

app.use(errorLogger); // Подключить логгер ошибок
app.use(errors());
app.use(errHandler);

// запуск сервера на заданном порту
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
