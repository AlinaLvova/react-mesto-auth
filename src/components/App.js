import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "./../utils/Api";
import { CurrentUserContext } from "./../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRouteElement from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [isUpdateAvatarPopupOpen, setIsUpdateAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getCardList()
      .then((cardListData) => {
        setCards(
          cardListData.map((card) => ({
            _id: card._id,
            name: card.name,
            link: card.link,
            likes: card.likes,
            owner: card.owner,
          }))
        );
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((infoData) => {
        setCurrentUser(infoData);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleUpdateAvatarClick = () => {
    setIsUpdateAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddCardClick = () => {
    setIsAddCardPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsUpdateAvatarPopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard({});
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((c) => (c._id !== card._id ? c : null))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateUser = ({ name, about }) => {
    api
      .updateUserInfo(name, about)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    api
      .updateAvatar(avatar)
      .then(() => {
        currentUser.avatar = avatar;
        setCurrentUser(currentUser);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    return api
      .sentCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header />
          <main className="content">
            <Routes>
              <Route
                exact path="/"
                element={
                  loggedIn ? (
                    <Navigate to="/mesto" replace />
                  ) : (
                    <Navigate to="/sign-in" replace />
                  )
                }
              ></Route>
              <Route path="/sign-up" element={<Login />}></Route>
              <Route path="/sign-in" element={<Register />}></Route>
              <Route 
                path="/mesto" 
                element={
                <ProtectedRouteElement 
                  element={Main}
                  loggedIn={loggedIn}
                  onEditProfile={handleEditProfileClick}
                  onUpdateAvatar={handleUpdateAvatarClick}
                  onAddCard={handleAddCardClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />}
              />
            </Routes>
          </main>
          <Footer />
          {/* popup: edit profile */}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
            onClose={closeAllPopups}
          ></EditProfilePopup>
          {/* popup: confirmation */}
          <PopupWithForm
            name="confirmation"
            title="Вы уверены?"
            buttonTitle="Да"
            onClose={closeAllPopups}
          ></PopupWithForm>
          {/* popup: update avatar */}
          <EditAvatarPopup
            isOpen={isUpdateAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          ></EditAvatarPopup>
          {/* popup: add new card */}
          <AddPlacePopup
            isOpen={isAddCardPopupOpen}
            onAddPlace={handleAddPlaceSubmit}
            onClose={closeAllPopups}
          ></AddPlacePopup>
          {/* popup: open card */}
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
