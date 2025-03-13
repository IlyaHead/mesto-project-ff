import { likeTheCard, deleteCard } from "./api";

// Функция создания карточки
export function createCard(card, removeCard, likeCard, openImagePopup, currentUserId) {
  const cardTemplate        = document.querySelector('#card-template').content;
  const cardElement         = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage           = cardElement.querySelector('.card__image');
  const deleteButton        = cardElement.querySelector('.card__delete-button');
  const likeButton          = cardElement.querySelector('.card__like-button');
  const likeCounter         = cardElement.querySelector('.box__like-counter');

  cardImage.src = card.link;
  cardImage.alt = card.alt;
  cardElement.querySelector('.card__title').textContent = card.name;

  likeCounter.textContent = card.likes ? card.likes.length : 0;

  // Если лайк уже стоит, добавляем класс
  if (card.likes && card.likes.some(like => like._id === currentUserId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  //
  if (!card.owner || card.owner._id !== currentUserId) {
    deleteButton.style.display = 'none';
  }

  // deleteButton.addEventListener('click', () => removeCard(cardImage));
  deleteButton.addEventListener('click', () => removeCard(card.id, cardElement));
  likeButton.addEventListener('click', () => likeCard(likeButton, card.id, likeCounter));
  cardImage.addEventListener('click', openImagePopup);
  return cardElement;
}

// Функция удаления карточки
export function removeCard(cardId, cardElement) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove(); // Удаляем карточку из DOM
    })
    .catch((err) => {
      console.error('Ошибка при удалении карточки:', err);
    });
}

// Функция лайка карточки
export function likeCard(item, cardId, likeCounter) {
  const isLiked = item.classList.contains('card__like-button_is-active');

  likeTheCard(cardId, isLiked)
    .then((updatedCard) => {
      item.classList.toggle('card__like-button_is-active');

      likeCounter.textContent = updatedCard.likes.length;
    })
    .catch((err) => {
      console.error('Ошибка при обновлении лайка:', err);
    });
}