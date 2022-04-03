import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const emailEl = document.querySelector('.feedback-form input');
const messageEl = document.querySelector('.feedback-form textarea');

populateTextarea();

form.addEventListener('input', throttle(textinput, 500));

function textinput(e) {
  //formData[e.target.name] = e.target.value;
  //Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message
  let formData = localStorage.getItem(STORAGE_KEY);

  formData = formData ? JSON.parse(formData) : {};
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

//При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы

function populateTextarea() {
  let savedDataToLocalStorage = localStorage.getItem(STORAGE_KEY);

  if (savedDataToLocalStorage) {
    savedDataToLocalStorage = JSON.parse(savedDataToLocalStorage);
    Object.entries(savedDataToLocalStorage).forEach(([name, value]) => {
      form.elements[name].value = value;
    });
  }
}

//form submit and reset it after submitting
form.addEventListener('submit', onFormSubmit);
let userRegistrationData = {};
function onFormSubmit(evt) {
  evt.preventDefault();
  if (
    emailEl.value !== null &&
    emailEl.value !== '' &&
    messageEl.value !== 0 &&
    messageEl.value !== ''
  ) {
    userRegistrationData.email = emailEl.value;
    userRegistrationData.message = messageEl.value;

    console.log(userRegistrationData);
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
  } else {
    alert('Заполните все поля');
  }
}
