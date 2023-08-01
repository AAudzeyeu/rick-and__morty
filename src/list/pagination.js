import { getPageCharacter, updateMovieState } from "../api";
import { divInvisible, divMainContainer } from "./main"

const { body } = document;
export const divPagination = document.createElement("form");
const arrowRight = document.createElement("div");
const arrowLeft = document.createElement("div");
const arrowDoubleLeft = document.createElement("div");

export const createPaginationList = async (page) => {

    divPagination.innerHTML = "";
    divPagination.classList.add("pagination-main");

    const divPaginationContainer = document.createElement("div");
    divPaginationContainer.classList.add("pagination-container")

    const divPaginationRadio = document.createElement("input");
    divPaginationRadio.type = "radio";
   

    const divPaginationNumber = document.createElement("label");
    divPaginationNumber.classList.add("pagination-item")

    divInvisible.append(divPaginationContainer);

    getPageCharacter().then((data) => { 

        const url = new URL(window.location);
        const maxPage = data.info.pages;

            divPagination.innerHTML = "";
            const urlReverse = url.search.split('=')[1];

            if (+urlReverse <= 33) {
                for (let i = 0; i < 9; i++) {
                const container = divPaginationContainer.cloneNode(true);
                const paginationRadio = divPaginationRadio.cloneNode(true);
                const paginationNumber = divPaginationNumber.cloneNode(true);

                paginationRadio.id = `pagination-${+urlReverse + i}`;
                paginationRadio.classList.add(`pagination-${+urlReverse + i}`)
                paginationRadio.name = `pagination`;
                container.append(paginationRadio);
            
                paginationNumber.textContent = +urlReverse + i;
                paginationNumber.setAttribute("for", `pagination-${+urlReverse + i}`);
                container.append(paginationNumber);

                divPagination.append(container);
            }
                }   else if (+urlReverse == maxPage) {
                for (let i = 9; i > 0; i--) {
                    const container = divPaginationContainer.cloneNode(true);
                    const paginationRadio = divPaginationRadio.cloneNode(true);
                    const paginationNumber = divPaginationNumber.cloneNode(true);
                    
                    paginationRadio.id = `pagination-${+urlReverse - i}`;
                    paginationRadio.name = `pagination`;
                    container.append(paginationRadio);
                
                    paginationNumber.textContent = +urlReverse - i;
                    paginationNumber.setAttribute("for", `pagination-${+urlReverse - i}`);
                    container.append(paginationNumber);
    
                    divPagination.append(container);
                    }
                }   else if (+urlReverse <= 41) {
                    for (let i = 9; i > 0; i--) {
                        const container = divPaginationContainer.cloneNode(true);
                        const paginationRadio = divPaginationRadio.cloneNode(true);
                        const paginationNumber = divPaginationNumber.cloneNode(true);
    
                        paginationRadio.id = `pagination-${maxPage - i}`;
                        paginationRadio.name = `pagination`;
                        container.append(paginationRadio);
                    
                        paginationNumber.textContent = maxPage - i;
                        paginationNumber.setAttribute("for", `pagination-${maxPage - i}`);
                        container.append(paginationNumber);
        
                        divPagination.append(container);
                }
            };        

        

        const containerLast = divPaginationContainer.cloneNode(true);
        const inputthreedots = document.createElement("input");
        inputthreedots.type = "text";
        inputthreedots.classList.add("three-dots");
        inputthreedots.maxLength = 2;
        inputthreedots.max = maxPage;
        inputthreedots.placeholder = "..."
        divPagination.append(inputthreedots);
    
        const paginationRadioLast = document.createElement("input")
        paginationRadioLast.type = "radio";
    
        paginationRadioLast.id = `pagination-${maxPage}`;
        paginationRadioLast.name = `pagination`;
        containerLast.append(paginationRadioLast);
                
        const paginationNumberLast = document.createElement("label");
        paginationNumberLast.classList.add("pagination-item")
        paginationNumberLast.textContent = maxPage;
        paginationNumberLast.setAttribute("for", `pagination-${maxPage}`);
        containerLast.append(paginationNumberLast);
        divPagination.append(containerLast);
        divPagination.querySelector(`#pagination-${page}`).checked = true;
        
        if (page < maxPage) {
            arrowRight.innerHTML = "";
            arrowRight.classList.add("arrow-2");
    
            const arrowTop = document.createElement("div");
            arrowTop.classList.add("arrow-2-top");
            arrowRight.append(arrowTop);
    
            const arrowBottom = document.createElement("div");
            arrowBottom.classList.add("arrow-2-bottom");
            arrowRight.append(arrowBottom);
            
    
            divPagination.append(arrowRight);
        }
        if (page > 1) {
            arrowLeft.innerHTML = "";
            arrowDoubleLeft.innerHTML = "";
            arrowLeft.classList.add("arrow-2");
    
            const arrowLeftTop = document.createElement("div");
            arrowLeftTop.classList.add("arrow-2-top", "arrow-2-topLeft");
            arrowLeft.append(arrowLeftTop);
    
            const arrowLeftBottom = document.createElement("div");
            arrowLeftBottom.classList.add("arrow-2-bottom", "arrow-2-bottomLeft");
            arrowLeft.append(arrowLeftBottom);
            
    
            divPagination.prepend(arrowLeft);

            arrowDoubleLeft.classList.add("arrow-1");
    
            const arrowDoubleLeftLine = document.createElement("div");
            arrowDoubleLeft.append(arrowDoubleLeftLine);
    
            divPagination.prepend(arrowDoubleLeft);
        }
    });
    divMainContainer.append(divPagination);
}


divPagination.addEventListener("change", (e) => {
    e.preventDefault();
    const maxPage = 42;
    if (e.target.value > maxPage) e.target.value = maxPage;
    if (+e.target.value <= maxPage)  {
        updateMovieState(+e.target.value)
    }   else {
        updateMovieState(+e.target.id.split("-")[1])
    }

    
});

divPagination.addEventListener("submit", (e) => {
    e.preventDefault();
});

arrowRight.addEventListener("click", (e) => {
    e.preventDefault();
    const url = new URL(window.location);
        const urlReverse = url.search.split('=')[1];

    updateMovieState(+urlReverse + 1);
})

arrowLeft.addEventListener("click", (e) => {
    e.preventDefault();
    const url = new URL(window.location);
        const urlReverse = url.search.split('=')[1];

    updateMovieState(+urlReverse - 1);
})

arrowDoubleLeft.addEventListener("click", (e) => {
    e.preventDefault();
    updateMovieState(1);
})


