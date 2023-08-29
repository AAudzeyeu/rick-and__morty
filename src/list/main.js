import { getOneCharacter } from "../api";

export const divMainContainer = document.createElement("div");
export const divInvisible = document.createElement("div");
const imgCard = document.createElement("img");
const divCardContainer = document.createElement("div");

export const createMainList = (container) => {
    divMainContainer.classList.add("main-card__container");
    
    divCardContainer.classList.add("card-container");

    const divCardBackground = document.createElement("div");
    divCardBackground.classList.add("card-background");
    divCardContainer.innerHTML = "";
    divCardContainer.append(divCardBackground);

    const figureCardContainer = document.createElement("figure");
    figureCardContainer.classList.add("card-image__container");
    divCardBackground.append(figureCardContainer);

    imgCard.classList.add("card-image");
    figureCardContainer.append(imgCard);

    const figcaptionTextCard = document.createElement("figcaption");
    figcaptionTextCard.classList.add("text-name__character");
    figureCardContainer.append(figcaptionTextCard);

  
    divInvisible.classList.add("invisible");
    divInvisible.append(divCardContainer);

    divMainContainer.append(divInvisible);
    container.append(divMainContainer);
}
export const createMovieCard = (character) => {
    const movieElement = divCardContainer.cloneNode(true);
  
	movieElement.querySelector(".card-image").src = character.image;

    movieElement.querySelector(".text-name__character").textContent = character.name;
    movieElement.dataset.id = character.id;
   


	return movieElement;
}

divMainContainer.addEventListener("click", (e) => {

    const { body } = document;
    const elem = e.target.closest(".card-container");
    
    if (elem && !e.target.parentNode.classList.contains("pagination-container") &&
    !e.target.parentNode.classList.contains("pagination-main")) {
        const divMainModalContainer = document.createElement("div");
        divMainModalContainer.classList.add("modal-main__container");

        const divModalBack = document.createElement("div");
        divModalBack.classList.add("modal-back");

        const closeModal = document.createElement("div");
        closeModal.classList.add("closeModal");
        divMainModalContainer.append(closeModal);

        closeModal.addEventListener("click", () => {
        body.style.overflowY = "auto";
        divMainModalContainer.remove();
        divModalBack.remove();
        })
        getOneCharacter(elem.getAttribute("data-id")).then((data) => {

            const divPhotoCharacter = document.createElement("div");
            divPhotoCharacter.classList.add("modal-phtoto__container");
            divMainModalContainer.append(divPhotoCharacter);

            const photoCharacter = document.createElement("img");
            photoCharacter.classList.add("modal-photo__character");
            photoCharacter.src = data.image;
            divPhotoCharacter.append(photoCharacter);

            const divModalTextContainer = document.createElement("div");
            divModalTextContainer.classList.add("modal-text__container");
            divMainModalContainer.append(divModalTextContainer);

            const divNameContainer = document.createElement("div");
            divNameContainer.classList.add("modal-name__container");
            divModalTextContainer.append(divNameContainer);

            const paragraphNameHeader = document.createElement("p");
            paragraphNameHeader.classList.add("modal-text__header");
            paragraphNameHeader.textContent = "Name";
            divNameContainer.append(paragraphNameHeader);

            const paragraphName = document.createElement("p");
            paragraphName.classList.add("modal-text");
            paragraphName.textContent = data.name;
            divNameContainer.append(paragraphName);

            const divOriginContainer = document.createElement("div");
            divOriginContainer.classList.add("modal-name__container");
            divModalTextContainer.append(divOriginContainer);

            const paragraphOriginHeader = document.createElement("p");
            paragraphOriginHeader.classList.add("modal-text__header");
            paragraphOriginHeader.textContent = "Origin";
            divOriginContainer.append(paragraphOriginHeader);

            const paragraphOrigin = document.createElement("p");
            paragraphOrigin.classList.add("modal-text");
            paragraphOrigin.textContent = data.origin.name;
            divOriginContainer.append(paragraphOrigin);

            const divStatusContainer = document.createElement("div");
            divStatusContainer.classList.add("modal-name__container");
            divModalTextContainer.append(divStatusContainer);

            const paragraphStatusHeader = document.createElement("p");
            paragraphStatusHeader.classList.add("modal-text__header");
            paragraphStatusHeader.textContent = "Status";
            divStatusContainer.append(paragraphStatusHeader);

            const paragraphStatus = document.createElement("p");
            paragraphStatus.classList.add("modal-text");
            paragraphStatus.textContent = data.status;
            divStatusContainer.append(paragraphStatus);
            
            const divLocationContainer = document.createElement("div");
            divLocationContainer.classList.add("modal-name__container");
            divModalTextContainer.append(divLocationContainer);

            const paragraphLocationHeader = document.createElement("p");
            paragraphLocationHeader.classList.add("modal-text__header");
            paragraphLocationHeader.textContent = "Location";
            divLocationContainer.append(paragraphLocationHeader);

            const paragraphLocation = document.createElement("p");
            paragraphLocation.classList.add("modal-text");
            paragraphLocation.textContent = data.location.name;
            divLocationContainer.append(paragraphLocation);
             
            const divSpeciesContainer = document.createElement("div");
            divSpeciesContainer.classList.add("modal-name__container");
            divModalTextContainer.append(divSpeciesContainer);

            const paragraphSpeciesHeader = document.createElement("p");
            paragraphSpeciesHeader.classList.add("modal-text__header");
            paragraphSpeciesHeader.textContent = "Species";
            divSpeciesContainer.append(paragraphSpeciesHeader);

            const paragraphSpecies = document.createElement("p");
            paragraphSpecies.classList.add("modal-text");
            paragraphSpecies.textContent = data.species;
            divSpeciesContainer.append(paragraphSpecies);
             
            const divGenderContainer = document.createElement("div");
            divGenderContainer.classList.add("modal-name__container");
            divModalTextContainer.append(divGenderContainer);

            const paragraphGenderHeader = document.createElement("p");
            paragraphGenderHeader.classList.add("modal-text__header");
            paragraphGenderHeader.textContent = "Gender";
            divSpeciesContainer.append(paragraphGenderHeader);

            const paragraphGender = document.createElement("p");
            paragraphGender.classList.add("modal-text");
            paragraphGender.textContent = data.gender;
            divSpeciesContainer.append(paragraphGender);
        })
        body.style.overflowY = "hidden";
        body.append(divMainModalContainer);
        body.append(divModalBack);
        
    }
})






