// проверка полей формы на неверный ввод внутри
function hasInValidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

//  Функция скрыть ошибку
function hideInputError(formElement, inputElement, {inputErrorClass, errorClass}){
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

//  Функция показать ошибку
function showInputError(formElement, inputElement, errorMessage, {inputErrorClass, errorClass}){
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

// функция для стилизации кнопки "Сохранить" в формах
function toggleButtonState(inputList, buttonElement, { inactiveButtonClass}) {
  if(hasInValidInput(inputList)){
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

// общая функция для проверки элементов формы на валидность
function isValid(formElement, inputElement, { inputErrorClass, errorClass}){

  if (inputElement.validity.valueMissing) {
    inputElement.setCustomValidity("");
  } 
  else if (inputElement.validity.patternMismatch) {
    const errorMessage = inputElement.dataset.errorMessage;
    inputElement.setCustomValidity(errorMessage);
  } 
  else {
    inputElement.setCustomValidity("");
  }

  if(!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage, { inputErrorClass, errorClass});
  } else {
    hideInputError(formElement, inputElement, { inputErrorClass, errorClass});
  }
}

function setEventListeners(formElement, { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}){
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, {inputErrorClass, errorClass});
      toggleButtonState(inputList, buttonElement, {inactiveButtonClass});
    })
  })
}

export function enableValidation({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass});
  })
}

export function clearValidation(formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}){

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  inputList.forEach((inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    hideInputError(formElement, inputElement, {inputErrorClass, errorClass});

    const buttonElement = formElement.querySelector(submitButtonSelector);
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  })
}
