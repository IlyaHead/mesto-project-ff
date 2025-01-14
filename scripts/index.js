// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const places = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(card, removeCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.alt;
  cardElement.querySelector('.card__title').textContent = card.name;
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => removeCard(deleteButton));
  return cardElement;
}
// @todo: Функция удаления карточки
function removeCard(item) {
  item.closest('.places__item').remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  places.append(createCard(item, removeCard))
});