import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "./../utils/Auth";
import InfoTooltip from "./InfoTooltip";

function AuthenticationForm(props) {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false); //проверка email на корректность ввода данных
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (formValue.password.length >= 3) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [formValue.email, formValue.password]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });

    if (name === "email") {
      setEmailValid(/^\S+@\S+\.\S+$/.test(value));
    }
  };

  function handleClickLogIn() {
    navigate("/sign-in", { replace: true });
  }

  function handleClosePopup() {
    setIsInfoTooltipOpen(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.isLogin) {
      auth.register(formValue.password, formValue.email).then((res) => {
        if (res === 400 || res === 401) {
          setIsInfoTooltipOpen(true);
        } else {
          props.handleLogin();
          navigate("/mesto", {
            replace: true,
            state: { isOpenInfoPopup: true },
          });

          setFormValue({
            email: "",
            password: "",
          });
        }
      });
    }
  };

  return (
    <>
      <div className="auth">
        <h3 className="auth__title">
          {props.isLogin ? "Регистрация" : "Вход"}
        </h3>
        <form className="auth__form">
          <div className="auth__form-input-group">
            <input
              id="email"
              name="email"
              type="email"
              className="auth__input auth__span"
              placeholder="Email"
              required
              value={formValue.email}
              onChange={handleChange}
            />
            <span className="auth__error"></span>
            <input
              id="password"
              name="password"
              type="password"
              className="auth__input auth__span"
              placeholder="Пароль"
              required
              value={formValue.password}
              onChange={handleChange}
            />
          </div>
          <button
            className={`auth__button ${!buttonDisabled && "link"}`}
            type="submit"
            onClick={handleSubmit}
            disabled={buttonDisabled}
          >
            {props.isLogin ? "Зарегистрироваться" : "Войти"}
          </button>
        </form>
        <span className="auth__error"></span>
        {props.isLogin && (
          <button className="auth__span link" onClick={handleClickLogIn}>
            Уже зарегистрированы? Войти
          </button>
        )}
      </div>
      <InfoTooltip
        status={false}
        isOpen={isInfoTooltipOpen}
        onClosePopup={handleClosePopup}
      ></InfoTooltip>
    </>
  );
}

export default AuthenticationForm;
