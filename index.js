import "./src/style/main/style.scss";
import "./src/style/pagination/style.scss";
import "./src/style/pagination/animation.scss";
import "./src/style/switch/style.scss";
import "./src/style/api/style.scss";

import { createMainList, divMainContainer } from "./src/list/main"
import { createSwitchBooksMode, inputRoundSwitch, paragraphTextSwitch } from "./src/list/switch";
import { updateMovieState, updateAllMovieState, createDivClickToUp } from "./src/api";

const { body } = document;

export const initApp = async () => {
    document.title = "Rick and Morty";

    const url = new URL(window.location);
    const searchRegex = /page/i;
    const typeText = url.search.split("=")[1];

    createSwitchBooksMode(body);
    createMainList(body);
    
        if (searchRegex.test(url)) {
            inputRoundSwitch.checked = true;
            paragraphTextSwitch.style.color = "#337AB7";

    
            await updateMovieState(typeText);
           
        }   else {
            updateAllMovieState();
            createDivClickToUp();
        }


};

initApp();