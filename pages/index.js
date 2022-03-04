let popup = document.querySelector(".popup");
let editButton = document.querySelector(".profile__edit-button");
let closePopup = popup.querySelector(".popup__close");
let authorName = document.querySelector(".profile__title");
let submitButton = popup.querySelector(".popup__button");
let authorAbout = document.querySelector(".profile__subtitle");
let titleInput = popup.querySelector("#input-popup-title");
let subtitleInput = popup.querySelector("#input-popup-subtitle");
let editProfile = document.querySelector(".profile-popup");
let profileForm = popup.querySelector(".popup__form");
let saveButton = popup.querySelector(".popup__button");


function popupOpen() {
    popup.classList.add('popup__open');
};

editButton.addEventListener("click", popupOpen);

function popupClose() {

    popup.classList.remove('popup__open');

};

closePopup.addEventListener("click", popupClose);

function handleProfileEditSubmit(event) {
    event.preventDefault();

    authorName.textContent = titleInput.value;
    authorAbout.textContent = subtitleInput.value;

    popupClose(editProfile);
    profileForm.reset();

}

profileForm.addEventListener('submit', handleProfileEditSubmit);