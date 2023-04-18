import PopupWithForm from "./PopupWithForm";
import { useState } from "react";

function AddPlacePopup(props) {
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");
  const [buttonTitle, setButtonTitle] = useState("Создать");

  const handleChangeCardName = (e) => {
    setCardName(e.target.value);
  };

  const handleChangeCardLink = (e) => {
    setCardLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonTitle("Сохранение...");
    props.onAddPlace({
        name: cardName,
        link: cardLink,
      })
      .then(() => {
        setCardName("");
        setCardLink("");
        setButtonTitle("Создать");
      });
  };

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonTitle={buttonTitle}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="input-title"
        name="name"
        type="text"
        className="popup__input-field"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={cardName}
        onChange={handleChangeCardName}
      />
      <span className="input-title-error popup__input-field-error"></span>
      <input
        id="input-link"
        name="link"
        type="url"
        className="popup__input-field"
        placeholder="Ссылка на картинку"
        required
        value={cardLink}
        onChange={handleChangeCardLink}
      />
      <span className="input-link-error popup__input-field-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
