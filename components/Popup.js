import { closeButtonSelector } from "../utils/constants.js";
//import {closeByEscape} from "./components/Section.js";
const openPopup = document.querySelector('.popup_open');

export default class Popup {
    constructor(popupSelector) {
        this._element = document.querySelector(popupSelector);
        this._closeButtonElement = this._element.querySelector(closeButtonSelector);
        this._container = document.querySelector(containerSelector);
    }
    open() {
        this.classList.add(openPopup);
        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this.classList.remove(openPopup);
        document.addEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose(event) {
        if (event.key === "Escape") {
            this.close();
        }
    }

    _handleOverlayClick(event) {
        if (event.target.classList.contains(openPopup)) {
            this.close();
        }
    }

    _handleCloseButtonClick() {
        this.close();
    }

    setEventListeners() {
        this._element.addEventListener("mousedown", (event) => this._handleOverlayClick(event));
		this._closeButtonElement.addEventListener("click", (event) => this._handleCloseButtonClick(event));

    }


}