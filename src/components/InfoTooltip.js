import { useState } from "react";

import failedIcon from "./../images/failed.png";
import successIcon from "./../images/success.png";

function InfoTooltip(props) {
  const failedTitle = "Что-то пошло не так! Попробуйте ещё раз.";
  const successTitle = "Вы успешно зарегистрировались!";

  const handleClosePopup = () => {
    props.onClosePopup();
  };

  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-btn link"
          id="close-btn-edit"
          type="button"
          aria-label="close edit form"
          onClick={handleClosePopup}
        ></button>
        <div className="popup__form">
          <img className="popup__info-icon" src={props.status ? successIcon : failedIcon}/>
          <div className="popup__info-title">{props.status ? successTitle : props.title.length ? props.title : failedTitle}</div>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
