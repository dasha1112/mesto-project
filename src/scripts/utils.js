// Функция для рисования карточки
import { deleteCard, likeCard, unlikeCard } from "./api";
export function renderCard(cardData, container) {
    const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const deleteButton = cardElement.querySelector(".card__delete-button"); // Элемент кнопки удаления
    const likesCount = cardElement.querySelector(".card__likes-count");
    const likeButton = cardElement.querySelector(".card__like-button");
    const imagePopup = document.querySelector('.popup_type_image');
    const imagePopupImage = imagePopup.querySelector('.popup__image');
    const imagePopupTitle = imagePopup.querySelector('.popup__caption');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    likesCount.textContent = cardData.likes.length;

    function openImagePopup(title, link) {
        imagePopupImage.src = link;
        imagePopupImage.alt = title;
        imagePopupTitle.textContent = title;
        openModal(imagePopup);
    }
    function openModal(popup) {
        popup.classList.add('popup_is-opened', 'popup_is-animated'); // Добавляем классы
        setTimeout(() => {
            popup.classList.remove('popup_is-animated'); // Убираем анимацию после открытия
        }, 300);
    }
    cardImage.addEventListener("click", () => {
        openImagePopup(cardData.name, cardData.link);
    });

   // Отображаем количество лайков
    likesCount.textContent = cardData.likes.length;

    const userId = 'fe0135dd395dd2fece8c088f';
    const isLiked = cardData.likes.some(user => user._id === userId);
    if (isLiked) {
        likeButton.classList.add('card__like-button_is-active'); // Подсвечиваем кнопку
    }
    // Установка обработчика на кнопку лайка
    likeButton.addEventListener('click', () => {
        if (isLiked) {
            // Если уже лайкнута, то удаляем лайк
            unlikeCard(cardData._id, likesCount, likeButton);
            likeButton.classList.remove('card__like-button_is-active');
        } else {
            // Если не лайкнута, добавляем лайк
            likeCard(cardData._id, likesCount, likeButton);
            likeButton.classList.toggle('card__like-button_is-active');
        }
    });

    if (cardData.owner._id === "fe0135dd395dd2fece8c088f") { 
        deleteButton.style.display = 'block';
        deleteButton.addEventListener('click', () => {
            deleteCard(cardData._id, cardElement);
        });
    } else {
        deleteButton.style.display = 'none';
    }
    container.prepend(cardElement);
}

// export function updateAvatar(userId) {
//     const avatarPopup = document.querySelector('.popup_type_edit-avatar');
//     const closePopupButton = avatarPopup.querySelector('.popup__close');
//     const avatarForm = document.getElementById('avatar-form');

//     // Открытие попапа для обновления аватара
//     const editAvatarButton = document.querySelector('.profile__edit-avatar-button');
//     editAvatarButton.addEventListener('click', () => {
//         avatarPopup.style.display = 'block'; // Показываем попап
//     });

//     // Закрытие попапа
//     closePopupButton.addEventListener('click', () => {
//         avatarPopup.style.display = 'none'; // Скрываем попап
//     });

//     // Обработка отправки формы для обновления аватара
//     avatarForm.addEventListener('submit', (event) => {
//         event.preventDefault(); // Предотвращаем стандартную отправку формы
//         const avatarLink = avatarForm.avatar.value; // Получаем ссылку на новый аватар

//         // Отправка PATCH-запроса для обновления аватара
//         fetch(`https://nomoreparties.co/v1/cohortId/users/me/avatar`, {
//             method: 'PATCH',
//             headers: {
//                 authorization: token, // Не забудьте установить токен для авторизации
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ avatar: avatarLink }), // Отправляем JSON с новым аватаром
//         })
//         .then(res => {
//             if (!res.ok) {
//                 throw new Error(`Ошибка: ${res.status}`);
//             }
//             return res.json();
//         })
//         .then(updatedUser => {
//             // Обновляем аватар на странице
//             document.querySelector('.profile__image').src = updatedUser.avatar; // Обновляем источник аватара
//             avatarPopup.style.display = 'none'; // Закрываем попап после успешного обновления
//         })
//         .catch(err => console.error('Ошибка при обновлении аватара:', err));
//     });
// }