let popup = document.querySelector(".popup");
let editButton = document.querySelector(".profile__edit-button");
let closePopup = popup.querySelector(".popup__close");
let authorName = document.querySelector(".profile__title");
let submitButton = popup.querySelector(".popup__button");
let authorAbout = document.querySelector("profile__subtitle");
let titleInput = document.querySelector("#input-popup-title");
let subtitleInput = document.querySelector("#input-popup-subtitle");
let editProfile = document.querySelector(".profile-popup");
let profileForm = document.querySelector(".popup__form");

editButton.onclick = function popupOpen(){
    popup.classList.add('popup_open');
};

closePopup.onclick = function popupClose(){
    popup.classList.remove('popup_open');
};

function handleProfileEditSubmit(event) {
    event.preventDefault();
  
    authorName.textContent = popupauthorName.value;
    authorAbout.textContent = popupauthorAbout.value;
  
    popupClose(editProfile);
  
    profileForm.reset();
  }
  
  profileForm.addEventListener('submit', handleProfileEditSubmit);