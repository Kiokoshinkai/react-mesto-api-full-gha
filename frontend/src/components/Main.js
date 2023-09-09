import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
  onDeleteConfirmation,
}) {
  //контекст пользовательских данных
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content page__content">
      <section className="profile">
        <div className="profile__avatar-btn" onClick={onEditAvatar}>
          <img
            src={currentUser.avatar}
            alt="фото пользователя"
            className="profile__avatar"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__status">{currentUser.about}</p>
          <button
            aria-label="редактировать профиль"
            type="button"
            className="profile__edit-button button"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          aria-label="добавить место"
          type="button"
          className="profile__add-button button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section
        aria-label="Фото и названия мест куда можно поехать"
        className="elements content__elements"
      >
        {cards.map((item) => (
          <Card
            key={item._id}
            card={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            onDeleteConfirmation={onDeleteConfirmation}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
