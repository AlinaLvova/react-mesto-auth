import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "./../utils/Auth";
import InfoTooltip from "./InfoTooltip";
import { func } from "prop-types";

function AuthenticationForm(props) {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false); //проверка email на корректность ввода данных
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [errorInfoTooltipTitle, setErrorInfoTooltipTitle] = useState("");

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


  function handleError(error) {
    if (error.message){
      setErrorInfoTooltipTitle(error.message);
    }else if (error) {
      setErrorInfoTooltipTitle(error.error);
    }else{
      setErrorInfoTooltipTitle("");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = props.isLogin
        ? await auth.signin( formValue.email, formValue.password)
        : await auth.signup( formValue.email, formValue.password);
  
      if (!response.ok) {
        const error = await response.json();
        handleError(error);
        setIsInfoTooltipOpen(true);
        throw new Error(error.message);
      }
  
      const data = await response.json();

      console.log('data=', data);

      if (props.isLogin) {
        localStorage.setItem('jwt', data.jwt);
      }
      const email = data.data['email'];
      console.log('de=', email);

      props.handleLogin(email);

      navigate("/mesto", {
        replace: true,
        state: { isOpenInfoPopup: true },
      });
    } catch (error) {
      console.log('Error:', error);
    }
  }

  return (
    <>
      <div className="auth">
        <h3 className="auth__title">
          {props.isLogin ? "Вход" : "Регистрация"}
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
            {props.isLogin ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>
        <span className="auth__error"></span>
        {!props.isLogin && (
          <button className="auth__span link" onClick={handleClickLogIn}>
            Уже зарегистрированы? Войти
          </button>
        )}
      </div>
      <InfoTooltip
        status={false}
        isOpen={isInfoTooltipOpen}
        onClosePopup={handleClosePopup}
        title={errorInfoTooltipTitle}
      ></InfoTooltip>
    </>
  );
}

export default AuthenticationForm;
