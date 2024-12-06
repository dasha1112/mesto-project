import { renderCard} from './utils.js';
const token = 'e36235b7-6b97-4cf2-96e0-8c3801cecc6b';
const cohortId = 'frontend-st-cohort-201';

fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    headers: {
        authorization: token
    }
})
.then(res => res.json())
.then(result => console.log(result))
.catch(err => console.error(err));

fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    headers: { authorization: token }
})
.then(res => res.json())
.then(userData => {
    console.log(userData);
    // Присвойте данные элементам на странице
    document.querySelector('.profile__title').textContent = userData.name;
    document.querySelector('.profile__description').textContent = userData.about;
    document.querySelector('.profile__image').src = userData.avatar;
})
.catch(err => console.error(err));

const placesList = document.querySelector(".places__list"); 

fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    headers: { authorization: token }
})
.then(res => res.json())
.then(cards => {
    cards.forEach(card => {
        renderCard(card, placesList);
    });
})
.catch(err => console.error(err));

export function updateProfile(name, about) {
    fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
        }
        return res.json();
    })
    .then(updatedUser => {
        document.querySelector('.profile__title').textContent = updatedUser.name;
        document.querySelector('.profile__description').textContent = updatedUser.about;
    })
    .catch(err => console.error(err));
}

export function addCard(name, link) {
    fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
        method: 'POST',
        headers: {
            authorization: token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
        }
        return res.json();
    })
    // .then(cardData => {
    //     // Здесь можно вызвать renderCard, чтобы сразу добавить карточку на страницу
    //     renderCard(cardData, document.querySelector('.places__list'));
    // })
    .catch(err => console.error(err));
}

export function loadCards(container) {
    fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
        headers: {
            authorization: token
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
        }
        return res.json();
    })
    .then(cards => {
        // Очищаем контейнер перед добавлением карточек
        container.innerHTML = '';
        cards.forEach(card => {
            renderCard(card, container); // Вызываем renderCard для каждой карточки
        });
    })
    .catch(err => console.error('Ошибка при загрузке карточек:', err));
}

export function deleteCard(cardId, cardElement) {
    fetch(`https://nomoreparties.co/v1/${cohortId}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: token
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`Ошибка: ${res.status}`);
        }
        // Удаляем карточку из DOM
        cardElement.remove();
    })
    .catch(err => console.error('Ошибка при удалении карточки:', err));
}