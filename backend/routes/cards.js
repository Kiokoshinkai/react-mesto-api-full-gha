const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
} = require('../controllers/cards');

const urlRegex = require('../utils/regex');

const cardsRouter = express.Router();

const cardsIdShema = Joi.string().hex().length(24).required();

const cardsShema = {
  name: Joi.string().min(2).max(30).required(),
  link: Joi.string().pattern(urlRegex).required(),
};

cardsRouter.get('/', getCards);

cardsRouter.post('/', celebrate({
  [Segments.BODY]: cardsShema,
}), createCard);

cardsRouter.delete('/:cardId', celebrate({
  [Segments.PARAMS]: { cardId: cardsIdShema },
}), deleteCard);

cardsRouter.put('/:cardId/likes', celebrate({
  [Segments.PARAMS]: { cardId: cardsIdShema },
}), addLike);

cardsRouter.delete('/:cardId/likes', celebrate({
  [Segments.PARAMS]: { cardId: cardsIdShema },
}), removeLike);

module.exports = cardsRouter;
