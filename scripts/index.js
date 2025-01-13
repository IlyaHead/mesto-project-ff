// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
let cardElement;
// @todo: DOM узлы
let places = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(card, removeCard) {
  cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function() {
    removeCard(deleteButton);
  });
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