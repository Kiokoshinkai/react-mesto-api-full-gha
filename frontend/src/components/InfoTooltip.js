import React from "react";

function InfoTooltip ({ isOpen, onClose, image, title }) {
  return (
    <div className= {`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">

        <button
          aria-label="закрыть"
          type="button"
          className="popup__close-btn button"
          onClick={onClose}
        ></button>
        <div className="popup__register-info">
        <img className="popup__status" src={image} alt={title} />
        <h2 className="popup__info-text">{title}</h2>
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip;
