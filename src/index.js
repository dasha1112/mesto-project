import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import {updateProfile, addCard, loadCards, updateAvatar} from './scripts/api.js';

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
const cardSaveButton = cardFormElement.querySelector('.popup__button');

// Элементы поп-апа с изображением
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupTitle = imagePopup.querySelector('.popup__caption');
const avatarPopup = document.querySelector('.popup_type_avatar');
const editAvatarButton = document.querySelector('.profile__edit-avatar-button');

// Находим все поп-апы
const popups = document.querySelectorAll('.popup');

// Устанавливаем атрибуты для валидации
cardNameInput.setAttribute('minlength', '2');
cardNameInput.setAttribute('maxlength', '30');
cardLinkInput.setAttribute('type', 'url');
cardLinkInput.setAttribute('required', '');

// Функция для проверки состояния валидации
function toggleCardSaveButton() {
    if (cardFormElement.checkValidity()) {
        cardSaveButton.removeAttribute('disabled');
        cardSaveButton.classList.remove('inactive');
    } else {
        cardSaveButton.setAttribute('disabled', true);
        cardSaveButton.classList.add('inactive');
    }
}

// Обработчик события для ввода текста в поля формы
cardNameInput.addEventListener('input', () => {
    toggleCardSaveButton();
    showCardErrorMessages();
});

cardLinkInput.addEventListener('input', () => {
    toggleCardSaveButton();
    showCardErrorMessages();
});

// Функция для отображения сообщений об ошибках
function showCardErrorMessages() {
    const cardNameError = cardFormElement.querySelector('.name-error');
    const cardLinkError = cardFormElement.querySelector('.link-error');

    // Устанавливаем сообщение об ошибке для поля «Название» 
    if (!cardNameInput.validity.valid) {
        if (cardNameInput.validity.valueMissing) {
            cardNameError.textContent = "Это поле обязательно для заполнения.";
        } else if (cardNameInput.validity.tooShort) {
            cardNameError.textContent = "Название должно содержать минимум 2 символа.";
        } else if (cardNameInput.validity.tooLong) {
            cardNameError.textContent = "Название не должно превышать 30 символов.";
        }
    } else {
        cardNameError.textContent = "";
    }

    // Устанавливаем сообщение об ошибке для поля «Ссылка на картинку»
    if (!cardLinkInput.validity.valid) {
        if (cardLinkInput.validity.valueMissing) {
            cardLinkError.textContent = "Это поле обязательно для заполнения.";
        } else if (cardLinkInput.validity.typeMismatch) {
            cardLinkError.textContent = "Введите действительный URL.";
        }
    } else {
        cardLinkError.textContent = "";
    }
}

// Функция закрытия поп-апа по Esc
function closeByEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
}

// Функция для открытия поп-апа
function openModal(popup) {
    popup.classList.add('popup_is-opened', 'popup_is-animated');
    setTimeout(() => {
        popup.classList.remove('popup_is-animated');
    }, 300);
        document.addEventListener('keydown', closeByEsc);
}

// Функция для закрытия поп-апа
function closeModal(popup) {
    popup.classList.add('popup_is-animated');
    setTimeout(() => {
        popup.classList.remove('popup_is-opened', 'popup_is-animated');
    }, 300);
        document.removeEventListener('keydown', closeByEsc);
}

// Находим форму в DOM
const profileFormElement = profilePopup.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');
const saveButton = profileFormElement.querySelector('.popup__button');


// Устанавливаем атрибуты для валидации
nameInput.setAttribute('minlength', '2');
nameInput.setAttribute('maxlength', '40');
jobInput.setAttribute('minlength', '2');
jobInput.setAttribute('maxlength', '200');

// Функция для проверки состояния валидации
function toggleSaveButton() {
    if (profileFormElement.checkValidity()) {
        saveButton.removeAttribute('disabled');
    } else {
        saveButton.setAttribute('disabled', true);
    }
}

function showErrorMessages() {
    const nameError = profilePopup.querySelector('.name-error');
    const descriptionError = profilePopup.querySelector('.description-error');

    if (!nameInput.validity.valid) {
        if (nameInput.validity.valueMissing) {
            nameError.textContent = "Это поле обязательно для заполнения.";
        } else if (nameInput.validity.tooShort) {
            nameError.textContent = "Имя должно содержать минимум 2 символа.";
        } else if (nameInput.validity.tooLong) {
            nameError.textContent = "Имя не должно превышать 40 символов.";
        }
    } else {
        nameError.textContent = "";
    }

    if (!jobInput.validity.valid) {
        if (jobInput.validity.valueMissing) {
            descriptionError.textContent = "Это поле обязательно для заполнения.";
        } else if (jobInput.validity.tooShort) {
            descriptionError.textContent = "Описание должно содержать минимум 2 символа.";
        } else if (jobInput.validity.tooLong) {
            descriptionError.textContent = "Описание не должно превышать 200 символов.";
        }
    } else {
        descriptionError.textContent = "";
    }
}

nameInput.addEventListener('input', () => {
    toggleSaveButton();
    showErrorMessages();
});

jobInput.addEventListener('input', () => {
    toggleSaveButton();
    showErrorMessages();
});

function fillProfileForm() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}

const editProfileButton = document.querySelector('.profile__edit-button');
editProfileButton.addEventListener('click', () => {
    fillProfileForm();
    openModal(profilePopup);
});

const addCardButton = document.querySelector('.profile__add-button');
addCardButton.addEventListener('click', () => {
    cardNameInput.value = '';
    cardLinkInput.value = '';
    openModal(cardPopup);
});

// Обработчик клика по оверлею
popups.forEach(popup => {
    popup.addEventListener('click', (event) => {
        if (event.target === popup) {
            closeModal(popup);
        }
    });
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
    evt.preventDefault();

    const newName = nameInput.value;
    const newJob = jobInput.value;

    profileTitle.textContent = newName;
    profileDescription.textContent = newJob;
    updateProfile(newName, newJob);
    closeModal(profilePopup);
}

// Прикрепляем обработчик к форме
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

// Обработчик «отправки» формы добавления карточек
function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const newCardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value
    };
    
    const cardName = cardNameInput.value;
    const cardLink = cardLinkInput.value;

    const newCard = createCard(newCardData);
    placesList.prepend(newCard);
    
    addCard(cardName, cardLink);

    closeModal(cardPopup);
    cardNameInput.value = '';
    cardLinkInput.value = '';
    showCardErrorMessages();
}

// Прикрепляем обработчик к форме добавления карточек
cardFormElement.addEventListener('submit', handleCardFormSubmit);

// Добавление ошибок в HTML формы
const nameErrorHTML = '<p class="error-message name-error" style="color: red;"></p>'; // Элемент для ошибок названия
const linkErrorHTML = '<p class="error-message link-error" style="color: red;"></p>'; // Элемент для ошибок ссылки

// Вставляем ошибки в форму
cardFormElement.insertAdjacentHTML('beforeend', nameErrorHTML);
cardFormElement.insertAdjacentHTML('beforeend', linkErrorHTML);

toggleCardSaveButton();

// Функция открытия поп-апа с изображением
function openImagePopup(title, link) {
    imagePopupImage.src = link;
    imagePopupImage.alt = title;
    imagePopupTitle.textContent = title;
    openModal(imagePopup);
}
loadCards(placesList);
document.querySelectorAll('.popup').forEach((popup) => {
    popup.classList.add('popup_is-animated');
});

function handleAvatarUpdate(evt) {
    evt.preventDefault();
    const submitButton = evt.submitter;
    setLoadingState(submitButton, true);
    const avatarUrl = avatarInput.value;
    updateAvatar(avatarUrl)
        .then(user => {
        profileImage.style.backgroundImage = `url('${user.avatar}')`;
        closeModal(avatarPopup);
        })
        .catch(err => showError(`Ошибка обновления аватара: ${err}`))
        .finally(() => setLoadingState(submitButton, false));
    }

    document.querySelector('.popup__form_type_avatar').addEventListener('submit', handleAvatarUpdate);

editAvatarButton.addEventListener('click', () => {
    openModal(avatarPopup);
});