const screen2ContainerId = "screen2-slide";

// Stocker les s¨¦lections de l'utilisateur dans sessionStorage
const storeUserSelections = () => {
    const locationSelection = document.querySelector(`#${screen2ContainerId} .location-options .active`);
    const sizeSelection = document.querySelector(`#${screen2ContainerId} .size-options .active`);

    const userSelections = {
        location: locationSelection ? locationSelection.id : null,
        size: sizeSelection ? sizeSelection.id : null
    };

    sessionStorage.setItem("page2Selections", JSON.stringify(userSelections));
};

// G¨¦rer les clics sur les options
const setupSelectionListeners = () => {
    const locationOptions = document.querySelectorAll(`#${screen2ContainerId} .location-options .option`);
    const sizeOptions = document.querySelectorAll(`#${screen2ContainerId} .size-options .size`);

    locationOptions.forEach((option) => {
        option.addEventListener("click", () => {
            locationOptions.forEach((opt) => opt.classList.remove("active"));
            option.classList.add("active");
            storeUserSelections();
        });
    });

    sizeOptions.forEach((size) => {
        size.addEventListener("click", () => {
            sizeOptions.forEach((opt) => opt.classList.remove("active"));
            size.classList.add("active");
            storeUserSelections();
        });
    });
};

const initializeScreen2 = () => {
    const userSelections = JSON.parse(sessionStorage.getItem("page2Selections")) || {};

    if (userSelections.location) {
        const selectedLocation = document.querySelector(`#${screen2ContainerId} .location-options #${userSelections.location}`);
        if (selectedLocation) selectedLocation.classList.add("active");
    }

    if (userSelections.size) {
        const selectedSize = document.querySelector(`#${screen2ContainerId} .size-options #${userSelections.size}`);
        if (selectedSize) selectedSize.classList.add("active");
    }
};

document.addEventListener("DOMContentLoaded", () => {
    initializeScreen2();
    setupSelectionListeners();
});
