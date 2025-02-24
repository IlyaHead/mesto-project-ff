// Функция создания карточки
export function createCard(card, removeCard, likeCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.alt;
  cardElement.querySelector('.card__title').textContent = card.name;
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => removeCard(cardImage));
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => likeCard(likeButton));
  return cardElement;
}

// Функция удаления карточки
export function removeCard(item) {
  item.closest('.places__item').remove();
}

// Функция лайка карточки
export function likeCard(item) {
  item.classList.toggle('card__like-button_is-active');
}