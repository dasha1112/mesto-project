import { deleteCard, likeCard, unlikeCard } from "./api";
export function renderCard(cardData, container) {
    const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const deleteButton = cardElement.querySelector(".card__delete-button");
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
        popup.classList.add('popup_is-opened', 'popup_is-animated');
        setTimeout(() => {
            popup.classList.remove('popup_is-animated');
        }, 300);
    }
    cardImage.addEventListener("click", () => {
        openImagePopup(cardData.name, cardData.link);
    });

    likesCount.textContent = cardData.likes.length;

    const userId = 'fe0135dd395dd2fece8c088f';
    const isLiked = cardData.likes.some(user => user._id === userId);
    if (isLiked) {
        likeButton.classList.add('card__like-button_is-active');
    }
    likeButton.addEventListener('click', () => {
        if (isLiked) {
            unlikeCard(cardData._id, likesCount, likeButton);
            likeButton.classList.remove('card__like-button_is-active');
        } else {
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