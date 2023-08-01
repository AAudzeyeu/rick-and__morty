
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
   


	return movieElement;
}






