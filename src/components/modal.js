// Функция открытия модального окна
export function openModal(modal) {
  modal.classList.add('popup_is-animated');
  modal.classList.add('popup_is-opened');
}

// Функция закрытия модального окна
export function closeModal(modal) {
  modal.classList.remove('popup_is-animated');
  modal.classList.remove('popup_is-opened');
}