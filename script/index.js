let popup = document.querySelector(".popup");
let editButton = document.querySelector(".profile__edit-button");
let closePopup = popup.querySelector(".popup__close");
let authorName = document.querySelector(".profile__title");
let authorAbout = document.querySelector(".profile__subtitle");
let titleInput = popup.querySelector("#input-popup-title");
let subtitleInput = popup.querySelector("#input-popup-subtitle");
let profileForm = popup.querySelector(".popup__form");


function popupOpen() {
    titleInput.value = authorName.textContent;
    subtitleInput.value = authorAbout.textContent;
    popup.classList.add('popup_open');
};

function popupClose() {
    popup.classList.remove('popup_open');
};

function handleProfileEditSubmit(event) {
    event.preventDefault();

    authorName.textContent = titleInput.value;
    authorAbout.textContent = subtitleInput.value;

    popupClose();
    profileForm.reset();

}

profileForm.addEventListener('submit', handleProfileEditSubmit);
editButton.addEventListener("click", popupOpen);
closePopup.addEventListener("click", popupClose);