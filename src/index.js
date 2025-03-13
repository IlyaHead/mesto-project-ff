// Импорты

import './pages/index.css';
import { createCard, removeCard, likeCard } from './components/card';
import { openModal, closeModal } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import { userInfo, cardsRender, userInfoUpgrade, addNewCard, likeTheCard, updateAvatar } from './components/api';

//  DOM узлы
//  Общие узлы

const page                        = document.querySelector('.page');
const places                      = page.querySelector('.places__list');

//  Попапы
//  Редактировать профиль
const avatar = page.querySelector('.profile__image');

const editButton                  = page.querySelector('.profile__edit-button');
const editForm                    = page.querySelector('.popup_type_edit');
const editProfile                 = document.querySelector('.profile__title');
const editDescription             = document.querySelector('.profile__description');
const ProfileInput                = document.querySelector('.popup__input_type_name');
const DescriptionInput            = document.querySelector('.popup__input_type_description');
const editSaveButton              = editForm.querySelector('.button');

//  Добавить карточку
const addCardButton               = page.querySelector('.profile__add-button');
const addForm                     = page.querySelector('.popup_type_new-card');
const addFormNameInput            = document.querySelector('.popup__input_type_card-name');
const addFormUrlInput             = document.querySelector('.popup__input_type_url');
const addSaveButton               = addForm.querySelector('.button');

// Редактировать аватар
const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarInput = avatarPopup.querySelector('.popup__input_type_avatar-url');
const avatarEditButton = document.querySelector('.profile__edit-avatar-button');
const avatarContainer = document.querySelector('.profile__image');

//  Карточка места
const imagePopup                  = page.querySelector('.popup_type_image');

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-inactive',
  inputErrorClass: 'popup__input-error',
  errorClass: 'form__input-error-active'
};

// слушатель аватар

// Открытие попапа редактирования аватара
avatarContainer.addEventListener('click', () => {
  openModal(avatarPopup);
  clearValidation(avatarForm, validationConfig);
});

// Обработчик формы обновления аватара
function avatarFormHandler(evt) {
  evt.preventDefault();

  const newAvatarUrl = avatarInput.value;

  const avatarSaveButton = avatarForm.querySelector('.popup__button');
  avatarSaveButton.textContent = 'Сохранение...';

  updateAvatar(newAvatarUrl)
    .then((userData) => {
      avatar.style.backgroundImage = `url('${userData.avatar}')`;
      closeModal(avatarPopup);
    })
    .catch((err) => {
      console.error('Ошибка при обновлении аватара:', err);
    })
    .finally(() => {
      avatarSaveButton.textContent = 'Сохранить';
    });
}

avatarForm.addEventListener('submit', avatarFormHandler);

page.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup__close')) {
    const popup = evt.target.closest('.popup');
    if (popup) {
      closeModal(popup);
    }
  }
});

//  Повесить обработчик событий на кнопку "Редактировать | Добавить | Карточка"
//  Добавить слушатель на кнопку "Редактировать"
editButton.addEventListener('click', function () {

  ProfileInput.value              = editProfile.textContent;
  DescriptionInput.value          = editDescription.textContent;
  openModal(editForm);
  clearValidation(editForm, validationConfig);
});

function updateProfile(name, about) {
  return userInfoUpgrade(name, about)
    .then((updatedData) => {
      editProfile.textContent = updatedData.name;
      editDescription.textContent = updatedData.about;
    })
    .catch((err) => {
      console.log(`Ошибика: `, err);
    })
}

function editFormHandler(evt) {
  evt.preventDefault();

  const newName        = ProfileInput.value;
  const newAbout       = DescriptionInput.value;

  editSaveButton.textContent = 'Сохранение...';

  updateProfile(newName, newAbout)
    .then(() => {
      closeModal(editForm);
    })
    .catch((err) => {
      console.log('Ошибка:', err);
    })
    .finally(() => {
      editSaveButton.textContent = 'Сохранить';
    });
}

editForm.addEventListener('submit', editFormHandler);

//  Добавить слушатель на открытие картинки
function openImagePopup(evt) {
  const popImg = page.querySelector('.popup__image');
  const cardTitle = evt.target.closest('.card').querySelector('.card__title');
  const imageDescriptionPop = document.querySelector('.popup__caption');
  popImg.src = evt.target.src;
  popImg.alt = evt.target.alt;
  imageDescriptionPop.textContent = cardTitle.textContent;
  openModal(imagePopup);
}

//  Закрытие попапа по кнопке "Закрыть"
page.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup__close')) {
    const popup = evt.target.closest('.popup');
    if (popup) {
      closeModal(popup);
    }
  }
});

addCardButton.addEventListener('click', function () {
  addSaveButton.disabled = true;
  addSaveButton.classList.add('popup__button-inactive');
  openModal(addForm);
});

function addFormHandler(evt) {
  evt.preventDefault();

  const newCard = {
    name: addFormNameInput.value,
    link: addFormUrlInput.value,
    alt: addFormNameInput.value,
  };

  addSaveButton.textContent = 'Сохранение...';

  addNewCard(newCard.name, newCard.link)
  .then((cardData) => {
    const cardElement = createCard(
      {
        name: cardData.name,
        link: cardData.link,
        alt: cardData.name,
        id: cardData._id,
        likes: cardData.likes || [], 
      },
      removeCard,
      (likeButton) => likeCard(likeButton, cardData._id, cardElement.querySelector('.box__like-counter')),
      openImagePopup
    );

  places.prepend(cardElement);

  addFormNameInput.value = '';
  addFormUrlInput.value = '';
  clearValidation(addForm, validationConfig);
  closeModal(addForm);})
  .catch((err) => {
    console.log('Ошибка: ', err);
  })
  .finally(() => {
    // Возвращаем текст кнопки обратно
    addSaveButton.textContent = 'Сохранить';
  });
}

addForm.addEventListener('submit', addFormHandler);

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-inactive',
  inputErrorClass: 'popup__input-error',
  errorClass: 'form__input-error-active'
});


  Promise.all([userInfo(), cardsRender()])
  .then(([userData, cardsData]) => {
    editProfile.textContent = userData.name;
    editDescription.textContent = userData.about;
    avatar.style.backgroundImage = `url('${userData.avatar}')`;

    const currentUserId = userData.id;

    cardsData.forEach((item) => {
      places.append(createCard({
        name: item.name,
        link: item.link,
        alt: item.name,
        id: item.id,
        likes: item.likes || [],
        owner: item.owner,
      }, removeCard, likeCard, openImagePopup, currentUserId));
    });
  })
  .catch((err) => {
    console.error('Ошибка:', err);
  });