function AuthenticationForm(props) {
  return (
    <div className="auth">
      <h3 className="auth__title">{props.isLogin ? "Регистрация" : "Вход"}</h3>
      <form className="auth__form">
        <div className="auth__form-input-group">
        <input
          id="auth-email"
          name="auth-email"
          type="email"
          className="auth__input auth__span"
          placeholder="Email"
          //   ref={authEmail}
          required
        />
        <span className="auth__error"></span>
        <input
          id="auth-password"
          name="auth-password"
          type="password"
          className="auth__input auth__span"
          placeholder="Пароль"
          //   ref={authEmail}
          required
        />
        </div>
        <button className="auth__button link" type="submit" onClick="">
          {props.isLogin ? "Зарегистрироваться" : "Войти"}
        </button>
      </form>
      <span className="auth__error"></span>
      {props.isLogin && (
        <button className="auth__span link">Уже зарегистрированы? Войти</button>
      )}
    </div>
  );
}

export default AuthenticationForm;
