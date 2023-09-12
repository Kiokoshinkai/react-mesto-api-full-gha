import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onDeleteConfirmation }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (
    `card__like ${isLiked && "card__like_active"}`
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onDeleteConfirmation(card);
  }

  return (
    <article className="card" key={card.id}>
      {isOwn && (
        <button
          name="trash"
          type="button"
          className="card__trash button"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        src={card.link}
        alt={`${card.name}`}
        className="card__image"
        onClick={handleClick}
      />
      <div className="card__form">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button
            name="like"
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
