import './pages/index.css'; // добавили главный css файл
import { initialCards } from './scripts/cards';
import { createCard, removeCard, likeCard } from './components/card';
import { openModal, closeModal } from './components/modal';

// @todo: DOM узлы
const places = document.querySelector('.places__list');
const page = document.querySelector('.page');
const editButton = document.querySelector('.profile__edit-button');
const editPop = document.querySelector('.popup_type_edit');
const addPop = document.querySelector('.popup_type_new-card');
const editForm = document.querySelector('.popup__form[name="edit-profile"]');
const editFormProfile = document.querySelector('.profile__title');
const editFormDescription = document.querySelector('.profile__description');
const editFormProfileInput = document.querySelector('.popup__input_type_name');
const editFormDescriptionInput = document.querySelector('.popup__input_type_description');
const addCardForm = document.querySelector('.popup__form[name="new-place"]');
const addFormPlaceNameInput = document.querySelector('.popup__input_type_card-name');
const addFormPlaceUrlInput = document.querySelector('.popup__input_type_url');
const addCardButton = document.querySelector('.profile__add-button');
const addCardPop = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  places.append(createCard(item, removeCard, likeCard, openImagePopup));
});

// @todo: Повесить обработчик событий на кнопку "Редактировать | Добавить | Карточка"

// @todo: Добавить слушатель на кнопку "Редактировать"
editButton.addEventListener('click', function () {
  editFormProfileInput.value = editFormProfile.textContent;
  editFormDescriptionInput.value = editFormDescription.textContent;
  openModal(editPop);
});

// @todo: Добавить слушатель на кнопку "Добавить"
addCardButton.addEventListener('click', function () {
  openModal(addCardPop);
});

// @todo: Добавить слушатель на открытие картинки
function openImagePopup(evt) {
  const popImg = document.querySelector('.popup__image');
  const cardTitle = evt.target.closest('.card').querySelector('.card__title');
  const imageDescriptionPop = document.querySelector('.popup__caption');
  popImg.src = evt.target.src;
  popImg.alt = evt.target.alt;
  imageDescriptionPop.textContent = cardTitle.textContent;
  openModal(imagePopup);
}

// @todo: Закрытие попапа по кнопке "Закрыть"
page.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup__close')) {
    const popup = evt.target.closest('.popup');
    if (popup) {
      closeModal(popup);
    }
  }
});

// @todo: Кнопка "Сохранить" форма Профиля
function editFormHandler(evt) {
  evt.preventDefault();
  editFormProfile.textContent = editFormProfileInput.value;
  editFormDescription.textContent = editFormDescriptionInput.value;
  closeModal(editPop);
}

editForm.addEventListener('submit', editFormHandler);

// @todo: Кнопка "Сохранить" форма Добавления карты
function addCardFormHandler(evt) {
  evt.preventDefault();

  const newCard = {
    name: addFormPlaceNameInput.value,
    link: addFormPlaceUrlInput.value,
    alt: addFormPlaceNameInput.value,
  };

  places.prepend(createCard(newCard, removeCard, likeCard, openImagePopup));

  addFormPlaceNameInput.value = '';
  addFormPlaceUrlInput.value = '';

  closeModal(addPop);
}

addCardForm.addEventListener('submit', addCardFormHandler);

