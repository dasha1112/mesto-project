import './pages/index.css';
import { initialCards } from './scripts/cards.js';

// Темплейт карточки
const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".places__item");

// DOM узлы
const placesList = document.querySelector(".places__list");

// Функция создания карточки
function createCard(cardData) {
    const card = cardTemplate.cloneNode(true);
    const cardTitle = card.querySelector(".card__title");
    const cardImage = card.querySelector(".card__image");

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    const deleteButton = card.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => {
        deleteCard(card);
    });

    // Установка слушателя на кнопку "лайк"
    const likeButton = card.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
        likeButton.classList.toggle('card__like-button_is-active');
    });

    // Установка слушателя на изображение для открытия поп-апа с изображением
    cardImage.addEventListener("click", () => {
        openImagePopup(cardData.name, cardData.link);
    });

    return card;
}

// Функция удаления карточки
function deleteCard(card) {
    card.remove();
}

// Вывести карточки на страницу
function renderCard(cardData, method = "append") {
    const cardElement = createCard(cardData);
    placesList[method](cardElement);
}

initialCards.forEach((card) => {
    renderCard(card);
});

// Находим поп-апы в разметке
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

// Элементы профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Элементы формы добавления карточки
const cardFormElement = cardPopup.querySelector('.popup__form');
const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardPopup.querySelector('.popup__input_type_url');

// Элементы поп-апа с изображением
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupTitle = imagePopup.querySelector('.popup__caption');

// Функция для открытия поп-апа
function openModal(popup) {
    popup.classList.add('popup_is-opened', 'popup_is-animated');
    setTimeout(() => {
        popup.classList.remove('popup_is-animated');
    }, 300);
}

// Функция для закрытия поп-апа
function closeModal(popup) {
    popup.classList.add('popup_is-animated');
    setTimeout(() => {
        popup.classList.remove('popup_is-opened', 'popup_is-animated');
    }, 300);
}

// Находим форму в DOM
const profileFormElement = profilePopup.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');
const saveButton = profileFormElement.querySelector('.popup__button'); // Кнопка "Сохранить"


// Устанавливаем атрибуты для валидации
nameInput.setAttribute('minlength', '2');
nameInput.setAttribute('maxlength', '40');
jobInput.setAttribute('minlength', '2');
jobInput.setAttribute('maxlength', '200');

// Функция для проверки состояния валидации и активации/деактивации кнопки
function toggleSaveButton() {
    if (profileFormElement.checkValidity()) {
        saveButton.removeAttribute('disabled'); // Активируем кнопку
    } else {
        saveButton.setAttribute('disabled', true); // Деактивируем кнопку
    }
}

function showErrorMessages() {
    const nameError = profilePopup.querySelector('.name-error');
    const descriptionError = profilePopup.querySelector('.description-error');

    // Устанавливаем сообщение об ошибке для поля «Имя» 
    if (!nameInput.validity.valid) {
        if (nameInput.validity.valueMissing) {
            nameError.textContent = "Это поле обязательно для заполнения.";
        } else if (nameInput.validity.tooShort) {
            nameError.textContent = "Имя должно содержать минимум 2 символа.";
        } else if (nameInput.validity.tooLong) {
            nameError.textContent = "Имя не должно превышать 40 символов.";
        }
    } else {
        nameError.textContent = ""; // Убираем сообщение при успехе
    }

    // Устанавливаем сообщение об ошибке для поля «Занятие»
    if (!jobInput.validity.valid) {
        if (jobInput.validity.valueMissing) {
            descriptionError.textContent = "Это поле обязательно для заполнения.";
        } else if (jobInput.validity.tooShort) {
            descriptionError.textContent = "Описание должно содержать минимум 2 символа.";
        } else if (jobInput.validity.tooLong) {
            descriptionError.textContent = "Описание не должно превышать 200 символов.";
        }
    } else {
        descriptionError.textContent = ""; // Убираем сообщение при успехе
    }
}

// Добавление обработчика событий для проверки ошибок во время ввода
nameInput.addEventListener('input', () => {
    toggleSaveButton();
    showErrorMessages();
});

jobInput.addEventListener('input', () => {
    toggleSaveButton();
    showErrorMessages();
});

// Функция для заполнения полей формы данными пользователя
function fillProfileForm() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}

// Обработка кликов на кнопку редактирования профиля
const editProfileButton = document.querySelector('.profile__edit-button');
editProfileButton.addEventListener('click', () => {
    fillProfileForm();
    openModal(profilePopup);
});

// Обработка кликов на кнопку добавления карточки
const addCardButton = document.querySelector('.profile__add-button');
addCardButton.addEventListener('click', () => {
    cardNameInput.value = '';
    cardLinkInput.value = '';
    openModal(cardPopup);
});

// Обработка кликов на закрывающие кнопки поп-апов
const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const popup = event.target.closest('.popup');
        closeModal(popup);
    });
});

// Обработчик «отправки» формы профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Отменяем стандартную отправку формы

    // Получаем значения полей
    const newName = nameInput.value;
    const newJob = jobInput.value;

    // Обновляем значения на странице
    profileTitle.textContent = newName;
    profileDescription.textContent = newJob;

    // Закрываем поп-ап после сохранения
    closeModal(profilePopup);
}

// Прикрепляем обработчик к форме
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

// Обработчик «отправки» формы добавления карточек
function handleCardFormSubmit(evt) {
    evt.preventDefault(); // Отменяем стандартную отправку формы

    // Получаем значения из полей формы
    const newCardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value
    };

    // Создаем новую карточку и добавляем её в начало списка
    const newCard = createCard(newCardData);
    placesList.prepend(newCard);

    // Закрываем поп-ап и очищаем поля формы
    closeModal(cardPopup);
    cardNameInput.value = '';
    cardLinkInput.value = '';
}

// Прикрепляем обработчик к форме добавления карточек
cardFormElement.addEventListener('submit', handleCardFormSubmit);

// Функция открытия поп-апа с изображением
function openImagePopup(title, link) {
    imagePopupImage.src = link;
    imagePopupImage.alt = title;
    imagePopupTitle.textContent = title;
    openModal(imagePopup);
}

// Применение стилей к поп-апам
document.querySelectorAll('.popup').forEach((popup) => {
    popup.classList.add('popup_is-animated');
});
