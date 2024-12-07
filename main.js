(()=>{"use strict";function e(e,o){var r=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),c=r.querySelector(".card__image"),i=r.querySelector(".card__title"),a=r.querySelector(".card__delete-button"),u=r.querySelector(".card__likes-count"),s=r.querySelector(".card__like-button"),l=document.querySelector(".popup_type_image"),d=l.querySelector(".popup__image"),p=l.querySelector(".popup__caption");c.src=e.link,c.alt=e.name,i.textContent=e.name,u.textContent=e.likes.length,c.addEventListener("click",(function(){var t,n,o;t=e.name,n=e.link,d.src=n,d.alt=t,p.textContent=t,(o=l).classList.add("popup_is-opened","popup_is-animated"),setTimeout((function(){o.classList.remove("popup_is-animated")}),300)})),u.textContent=e.likes.length;var f=e.likes.some((function(e){return"fe0135dd395dd2fece8c088f"===e._id}));f&&s.classList.add("card__like-button_is-active"),s.addEventListener("click",(function(){f?(function(e,o,r){fetch("https://nomoreparties.co/v1/".concat(n,"/cards/likes/").concat(e),{method:"DELETE",headers:{authorization:t,"Content-Type":"application/json"}}).then((function(e){if(!e.ok)throw new Error("Ошибка: ".concat(e.status));return e.json()})).then((function(e){o.textContent=e.likes.length,r.classList.remove("card__like-button_active")})).catch((function(e){return console.error("Ошибка при удалении лайка:",e)}))}(e._id,u,s),s.classList.remove("card__like-button_is-active")):(function(e,o,r){fetch("https://nomoreparties.co/v1/".concat(n,"/cards/likes/").concat(e),{method:"PUT",headers:{authorization:t,"Content-Type":"application/json"}}).then((function(e){if(!e.ok)throw new Error("Ошибка: ".concat(e.status));return e.json()})).then((function(e){o.textContent=e.likes.length,r.classList.add("card__like-button_active")})).catch((function(e){return console.error("Ошибка при добавлении лайка:",e)}))}(e._id,u,s),s.classList.toggle("card__like-button_is-active"))})),"fe0135dd395dd2fece8c088f"===e.owner._id?(a.style.display="block",a.addEventListener("click",(function(){!function(e,o){fetch("https://nomoreparties.co/v1/".concat(n,"/cards/").concat(e),{method:"DELETE",headers:{authorization:t}}).then((function(e){if(!e.ok)throw new Error("Ошибка: ".concat(e.status));o.remove()})).catch((function(e){return console.error("Ошибка при удалении карточки:",e)}))}(e._id,r)}))):a.style.display="none",o.prepend(r)}var t="e36235b7-6b97-4cf2-96e0-8c3801cecc6b",n="frontend-st-cohort-201";fetch("https://nomoreparties.co/v1/".concat(n,"/cards"),{headers:{authorization:t}}).then((function(e){return e.json()})).then((function(e){return console.log(e)})).catch((function(e){return console.error(e)})),fetch("https://nomoreparties.co/v1/".concat(n,"/users/me"),{headers:{authorization:t}}).then((function(e){return e.json()})).then((function(e){console.log(e),document.querySelector(".profile__title").textContent=e.name,document.querySelector(".profile__description").textContent=e.about,document.querySelector(".profile__image").src=e.avatar})).catch((function(e){return console.error(e)}));var o=document.querySelector(".places__list");fetch("https://nomoreparties.co/v1/".concat(n,"/cards"),{headers:{authorization:t}}).then((function(e){return e.json()})).then((function(t){t.forEach((function(t){e(t,o)}))})).catch((function(e){return console.error(e)}));var r=document.querySelector("#card-template").content.querySelector(".places__item"),c=document.querySelector(".places__list");function i(e){var t=r.cloneNode(!0),n=t.querySelector(".card__title"),o=t.querySelector(".card__image");o.src=e.link,o.alt=e.name,n.textContent=e.name,t.querySelector(".card__delete-button").addEventListener("click",(function(){!function(e){e.remove()}(t)}));var c=t.querySelector(".card__like-button");return c.addEventListener("click",(function(){c.classList.toggle("card__like-button_is-active")})),o.addEventListener("click",(function(){var t,n;t=e.name,n=e.link,v.src=n,v.alt=t,h.textContent=t,L(s)})),t}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){!function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"append",n=i(e);c[t](n)}(e)}));var a=document.querySelector(".popup_type_edit"),u=document.querySelector(".popup_type_new-card"),s=document.querySelector(".popup_type_image"),l=document.querySelector(".profile__title"),d=document.querySelector(".profile__description"),p=u.querySelector(".popup__form"),f=u.querySelector(".popup__input_type_card-name"),_=u.querySelector(".popup__input_type_url"),m=p.querySelector(".popup__button"),v=s.querySelector(".popup__image"),h=s.querySelector(".popup__caption"),y=document.querySelector(".popup_type_avatar"),k=document.querySelector(".profile__edit-avatar-button"),S=document.querySelectorAll(".popup");function q(){p.checkValidity()?(m.removeAttribute("disabled"),m.classList.remove("inactive")):(m.setAttribute("disabled",!0),m.classList.add("inactive"))}function b(){var e=p.querySelector(".name-error"),t=p.querySelector(".link-error");f.validity.valid?e.textContent="":f.validity.valueMissing?e.textContent="Это поле обязательно для заполнения.":f.validity.tooShort?e.textContent="Название должно содержать минимум 2 символа.":f.validity.tooLong&&(e.textContent="Название не должно превышать 30 символов."),_.validity.valid?t.textContent="":_.validity.valueMissing?t.textContent="Это поле обязательно для заполнения.":_.validity.typeMismatch&&(t.textContent="Введите действительный URL.")}function g(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&E(t)}}function L(e){e.classList.add("popup_is-opened","popup_is-animated"),setTimeout((function(){e.classList.remove("popup_is-animated")}),300),document.addEventListener("keydown",g)}function E(e){e.classList.add("popup_is-animated"),setTimeout((function(){e.classList.remove("popup_is-opened","popup_is-animated")}),300),document.removeEventListener("keydown",g)}f.setAttribute("minlength","2"),f.setAttribute("maxlength","30"),_.setAttribute("type","url"),_.setAttribute("required",""),f.addEventListener("input",(function(){q(),b()})),_.addEventListener("input",(function(){q(),b()}));var x,C=a.querySelector(".popup__form"),j=a.querySelector(".popup__input_type_name"),A=a.querySelector(".popup__input_type_description"),w=C.querySelector(".popup__button");function T(){C.checkValidity()?w.removeAttribute("disabled"):w.setAttribute("disabled",!0)}function z(){var e=a.querySelector(".name-error"),t=a.querySelector(".description-error");j.validity.valid?e.textContent="":j.validity.valueMissing?e.textContent="Это поле обязательно для заполнения.":j.validity.tooShort?e.textContent="Имя должно содержать минимум 2 символа.":j.validity.tooLong&&(e.textContent="Имя не должно превышать 40 символов."),A.validity.valid?t.textContent="":A.validity.valueMissing?t.textContent="Это поле обязательно для заполнения.":A.validity.tooShort?t.textContent="Описание должно содержать минимум 2 символа.":A.validity.tooLong&&(t.textContent="Описание не должно превышать 200 символов.")}j.setAttribute("minlength","2"),j.setAttribute("maxlength","40"),A.setAttribute("minlength","2"),A.setAttribute("maxlength","200"),j.addEventListener("input",(function(){T(),z()})),A.addEventListener("input",(function(){T(),z()})),document.querySelector(".profile__edit-button").addEventListener("click",(function(){j.value=l.textContent,A.value=d.textContent,L(a)})),document.querySelector(".profile__add-button").addEventListener("click",(function(){f.value="",_.value="",L(u)})),S.forEach((function(e){e.addEventListener("click",(function(t){t.target===e&&E(e)}))})),document.querySelectorAll(".popup__close").forEach((function(e){e.addEventListener("click",(function(e){E(e.target.closest(".popup"))}))})),C.addEventListener("submit",(function(e){e.preventDefault();var o,r,c=j.value,i=A.value;l.textContent=c,d.textContent=i,o=c,r=i,fetch("https://nomoreparties.co/v1/".concat(n,"/users/me"),{method:"PATCH",headers:{authorization:t,"Content-Type":"application/json"},body:JSON.stringify({name:o,about:r})}).then((function(e){if(!e.ok)throw new Error("Ошибка: ".concat(e.status));return e.json()})).then((function(e){document.querySelector(".profile__title").textContent=e.name,document.querySelector(".profile__description").textContent=e.about})).catch((function(e){return console.error(e)})),E(a)})),p.addEventListener("submit",(function(e){e.preventDefault();var o,r,a={name:f.value,link:_.value},s=f.value,l=_.value,d=i(a);c.prepend(d),o=s,r=l,fetch("https://nomoreparties.co/v1/".concat(n,"/cards"),{method:"POST",headers:{authorization:t,"Content-Type":"application/json"},body:JSON.stringify({name:o,link:r})}).then((function(e){if(!e.ok)throw new Error("Ошибка: ".concat(e.status));return e.json()})).catch((function(e){return console.error(e)})),E(u),f.value="",_.value="",b()})),p.insertAdjacentHTML("beforeend",'<p class="error-message name-error" style="color: red;"></p>'),p.insertAdjacentHTML("beforeend",'<p class="error-message link-error" style="color: red;"></p>'),q(),x=c,fetch("https://nomoreparties.co/v1/".concat(n,"/cards"),{headers:{authorization:t}}).then((function(e){if(!e.ok)throw new Error("Ошибка: ".concat(e.status));return e.json()})).then((function(t){x.innerHTML="",t.reverse().forEach((function(t){e(t,x)}))})).catch((function(e){return console.error("Ошибка при загрузке карточек:",e)})),document.querySelectorAll(".popup").forEach((function(e){e.classList.add("popup_is-animated")})),document.querySelector(".popup__form_type_avatar").addEventListener("submit",(function(e){e.preventDefault();var o,r=e.submitter;setLoadingState(r,!0),(o=avatarInput.value,fetch("https://nomoreparties.co/v1/".concat(n,"/users/me/avatar"),{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:t},body:JSON.stringify({avatar:o})}).then((function(e){if(!e.ok)throw new Error("Не удалось обновить аватар");return e.json()}))).then((function(e){profileImage.style.backgroundImage="url('".concat(e.avatar,"')"),E(y)})).catch((function(e){return showError("Ошибка обновления аватара: ".concat(e))})).finally((function(){return setLoadingState(r,!1)}))})),k.addEventListener("click",(function(){L(y)}))})();