// Функция открытия модального окна
export function openModal(modal) {
  modal.classList.add('popup_is-opened');

  // Добавляем обработчики событий при открытии модального окна
  document.addEventListener('keydown', handleEscape);
  modal.addEventListener('click', handleOverlayClick);
}

// Функция закрытия модального окна
export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');

  // Удаляем обработчики событий при закрытии модального окна
  document.removeEventListener('keydown', handleEscape);
  modal.removeEventListener('click', handleOverlayClick);
}

// Функция-обработчик события нажатия Esc
function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

// Функция-обработчик события клика по оверлею
function handleOverlayClick(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    closeModal(evt.target);
  }
}