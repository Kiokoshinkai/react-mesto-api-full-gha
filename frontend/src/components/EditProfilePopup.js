import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"profile"}
      btnText={"Сохранить"}
      ariaLabel={"сохранить изменения профиля"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            id="name-input"
            name="name"
            value={name || ""}
            type="text"
            placeholder="Имя"
            required
            className="popup__form-item popup__form-item_el_name"
            minLength="2"
            maxLength="40"
            onChange={handleChangeName}
          />
          <span className="name-input-error popup__form-error">
            Вы пропустили это поле.
          </span>
          <input
            id="status-input"
            name="about"
            type="text"
            value={description || ""}
            placeholder="О себе"
            required
            className="popup__form-item popup__form-item_el_status"
            minLength="2"
            maxLength="200"
            onChange={handleChangeDescription}
          />
          <span className="status-input-error popup__form-error">
            Вы пропустили это поле.
          </span>
        </>
      }
    />
  );
}

export default EditProfilePopup;
