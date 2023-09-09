import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteConfirmationPopup({ card, isOpen, onClose, onCardDelete }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onCardDelete(card);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={"Вы уверены?"}
      name={"trash"}
      btnText={"Да"}
      ariaLabel={"удалить карточку"}
      classElement={"popup__form-title_el_title"}
    />
  );
}

export default DeleteConfirmationPopup;
