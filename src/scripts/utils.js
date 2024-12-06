// Функция для рисования карточки
import { deleteCard } from "./api";
export function renderCard(cardData, container) {
    const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const deleteButton = cardElement.querySelector(".card__delete-button"); // Элемент кнопки удаления

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

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