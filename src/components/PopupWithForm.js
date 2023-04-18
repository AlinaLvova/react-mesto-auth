function PopupWithForm(props){
    return(
        <div className={`popup ${props.isOpen ? 'popup_opened':''}`} id={`popup-${props.name}`}>
            <div className="popup__container">
                <button className="popup__close-btn link" id="close-btn-edit" type="button"
                    aria-label="close edit form"  onClick={props.onClose}></button>
                <form className="popup__form" method="POST" name={`${props.name}-form`} onSubmit={props.onSubmit}>
                    <h3 className="popup__title">{props.title}</h3>
                    {props.children}
                    <button className="popup__submit-btn link" type="submit">{props.buttonTitle}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;