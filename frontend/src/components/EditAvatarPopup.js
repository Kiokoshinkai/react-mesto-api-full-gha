import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar:
        avatarRef.current
          .value /* Значение инпута, полученное с помощью рефа */,
    });
  }

  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name={"avatar"}
      btnText={"Сохранить"}
      ariaLabel={"изменить аватар"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            id="place-avatar"
            name="link"
            ref={avatarRef}
            type="url"
            placeholder="Ссылка на картинку"
            required
            className="popup__form-item popup__form-item_el_avatar-link"
          />
          <span className="place-avatar-error popup__form-error">
            Введите адрес сайта.
          </span>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
