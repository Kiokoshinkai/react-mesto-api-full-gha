import React from "react";
import Header from "./Header";
import headerLogo from "../images/logo.svg";
import registrationSuccess from "../images/registration_success.svg";
import registrationDenied from "../images/registration_denied.svg";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import * as auth from "../utils/auth";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

function App() {
  //состояния кнопок попапов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [deleteCard, setDeleteCard] = React.useState({});
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isEmail, setIsEmail] = React.useState(null);
  const [popupImage, setPopupImage] = React.useState("");
  const [popupTitle, setPopupTitle] = React.useState("");
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard;

  //обработчик ESC
  React.useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  // получить данные пользователя и начальные карточки
  React.useEffect(() => {
    if (isLoggedIn === true) {
      Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        setCurrentUser(userInfo);
        setCards(initialCards);
      })
      .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  //токен
  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setIsEmail(res.email);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, []);

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate])

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  //функция подтверждение удаления
  function handleDeleteConfirmation(card) {
    setIsDeletePopupOpen(true);
    setDeleteCard(card);
  }

  //обработать лайк
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  //удаление карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => card._id !== c._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //функция закрытия попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipPopupOpen(false);
  }

  //функция изменения данных пользователя
  function handleUpdateUser(userInfo) {
    api
      .editProfile(userInfo)
      .then((userNewInfo) => {
        setCurrentUser(userNewInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //функция изменения аватара
  function handleUpdateAvatar(data) {
    api
      .editAvatar(data.avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //функция добавления карточки
  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((cardInfo) => {
        setCards([cardInfo, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //регистрация
  function onRegister(email, password) {
    auth.register(email, password)
    .then(() => {
      setPopupImage(registrationSuccess);
      setPopupTitle("Вы успешно зарегистрировались!");
      handleInfoTooltip();
      navigate("/sign-in");
    })
    .catch(() => {
      setPopupImage(registrationDenied);
      setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
      handleInfoTooltip();
    });
  }

  //авторизация
  function onLogin(email, password) {
    auth.login(email, password)
    .then((res) => {
      localStorage.setItem("jwt", res.token);
      setIsLoggedIn(true);
      setIsEmail(email);
      navigate("/");
    })
    .catch(() => {
      setPopupImage(registrationDenied);
      setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
      handleInfoTooltip();
    });
  }

  function handleInfoTooltip() {
    setIsInfoTooltipPopupOpen(true);
  }

  function onSignOut() {
    setCurrentUser('');
    setIsLoggedIn(false);
    setIsEmail(null);
    navigate("/sign-in");
    localStorage.removeItem("jwt");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/sign-up" element={
            <>
            <Header logo={headerLogo} title="Войти" route="/sign-in" />
            <Register onRegister={onRegister} />
            </>
            } />
          <Route path="/sign-in" element={
            <>
            <Header logo={headerLogo} title="Регистрация" route="/sign-up" />
            <Login onLogin={onLogin} />
            </>
            } />
          <Route exact path="/" element={
            <>
            <Header title="Выйти" mail={isEmail} onClick={onSignOut} logo={headerLogo} route=""/>
            <ProtectedRoute
              component={Main}
              isLogged={isLoggedIn}
              onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
              onEditProfile={() => setIsEditProfilePopupOpen(true)}
              onAddPlace={() => setIsAddPlacePopupOpen(true)}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onDeleteConfirmation={handleDeleteConfirmation}
            />
            <Footer />
            </>
          } />
          <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "sign-in"} />} />
        </Routes>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <DeleteConfirmationPopup
          card={deleteCard}
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          image={popupImage}
          title={popupTitle}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
