import { createMainList } from "./main";
import { updateMovieState, updateAllMovieState } from "../api";

const { body } = document

export const inputRoundSwitch = document.createElement("input");
const divSwitchContainer = document.createElement("form");
const divMainContainer = document.createElement("div");
export const paragraphTextSwitch = document.createElement("p");
export const createSwitchBooksMode = (container) => {
divSwitchContainer.classList.add("switch-container");
divSwitchContainer.classList.add("switch-main__container");

const labelRoundSwitch = document.createElement("label");
labelRoundSwitch.classList.add("switch");
divSwitchContainer.append(labelRoundSwitch);

inputRoundSwitch.id = "buttonSwitch"
inputRoundSwitch.type = "checkbox";
labelRoundSwitch.append(inputRoundSwitch);

const spanRoundSwitch = document.createElement("span");
spanRoundSwitch.classList.add("slider", "round");
labelRoundSwitch.append(spanRoundSwitch);

paragraphTextSwitch.classList.add("paragraph-text__switch");
paragraphTextSwitch.textContent = "Книжный режим";
divSwitchContainer.append(paragraphTextSwitch);

container.append(divSwitchContainer);
container.append(divMainContainer);

}

divSwitchContainer.addEventListener("change", (e) => {
    e.preventDefault();
    const url = new URL(window.location);
    const searchRegex = /page/i;
    const typeText = url.search.split("=")[1];
    if (e.target.checked) {
        paragraphTextSwitch.style.color = "#337AB7";

        createMainList(divMainContainer);

		url.searchParams.set("page", 1);
		window.history.pushState(null, "movie details", url.toString());

        if (searchRegex.test(url)) {
            updateMovieState(typeText);
        }   else {
       
        }
    } else {
        divMainContainer.innerHTML = "";
        createMainList(divMainContainer);
        paragraphTextSwitch.style.color = "#000";

        url.searchParams.delete("page");
        window.history.pushState(null, "movie details", url.toString());
        updateAllMovieState();
    }
    
    
  
})