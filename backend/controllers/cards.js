const Card = require('../models/card');
const BadRequestErr = require('../errors/BadRequestErr');
const ForbiddenErr = require('../errors/ForbiddenErr');
const NotFoundErr = require('../errors/NotFoundErr');

// возвращает все карточки
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
};

// создаёт карточку
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        if (err.errors && err.errors.link) {
          next(new BadRequestErr('Некорректный URL'));
        } else {
          next(new BadRequestErr('Переданы некорректные данные при создании карточки.'));
        }
      } else {
        next(err);
      }
    });
};

// удаляет карточку по идентификатору
const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  // ищем карточку
  Card.findById(cardId)
    .orFail(new NotFoundErr('Карточка не найдена'))
    .then((card) => {
    // проверка владельца карточки
      if (card.owner.toString() !== req.user._id.toString()) {
        return next(new ForbiddenErr('Недостаточно прав для удаления карточки'));
      }
      // удаляем карточку
      return Card.deleteOne({ _id: cardId })
        .then(() => res.status(200).send({ message: 'Карточка удалена' }))
        .catch((err) => {
          if (err.name === 'CastError') {
            throw new BadRequestErr('Переданы некорректные данные при удалении карточки.');
          } else if (err.name === 'NotFoundErr') {
            throw new NotFoundErr('Карточка с указанным _id не найдена.');
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

// поставить лайк карточке
const addLike = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .orFail(new NotFoundErr('Карточка не найдена'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestErr('Переданы некорректные данные для постановки лайка.'));
      } else if (err.name === 'NotFoundErr') {
        next(new NotFoundErr('Передан несуществующий _id карточки.'));
      } else {
        next(err);
      }
    });
};

// убрать лайк с карточки
const removeLike = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .orFail(new NotFoundErr('Карточка не найдена'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestErr('Переданы некорректные данные для снятия лайка.'));
      } else if (err.name === 'NotFoundErr') {
        next(new NotFoundErr('Передан несуществующий _id карточки.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
};
