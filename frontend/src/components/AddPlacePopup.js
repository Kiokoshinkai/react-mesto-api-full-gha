import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleChangePlace(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      title={"Новое место"}
      name={"card"}
      btnText={"Создать"}
      ariaLabel={"cоздать новую карточку"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            id="place-name"
            name="name"
            onChange={handleChangePlace}
            value={name}
            type="text"
            placeholder="Название"
            required
            className="popup__form-item popup__form-item_el_place-name"
            minLength="2"
            maxLength="30"
          />
          <span className="place-name-error popup__form-error">
            Вы пропустили это поле.
          </span>
          <input
            id="place-link"
            name="link"
            onChange={handleChangeLink}
            value={link}
            type="url"
            placeholder="Ссылка на картинку"
            required
            className="popup__form-item popup__form-item_el_place-link"
          />
          <span className="place-link-error popup__form-error">
            Введите адрес сайта.
          </span>
        </>
      }
    />
  );
}

export default AddPlacePopup;
