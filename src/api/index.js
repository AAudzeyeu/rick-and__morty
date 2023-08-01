import { createMovieCard, divMainContainer } from "../list/main";
import { createPaginationList, divPagination} from "../list/pagination"

const baseUrl = 'https://rickandmortyapi.com/api';
const { body } = document;

export let globalMoviesList = {};

export const defaultParams = {
	limit: 10,
	filter: undefined,
	search: undefined,
	sortBy: undefined,
	sortOrder: "desc",
};

export const getPageCharacter = (page = 1) =>
		fetch(`${baseUrl}/character/?page=${page}`).then((data) => data.json()
	)

export const getAllCharacter = () => 
	fetch(`${baseUrl}/character`).then((data) => data.json()
	)



export const updateMovieState = (page = 1) => {
	globalMoviesList = {};
	const moviesElements = [];
	return getPageCharacter(page).then((data) => { 
		
		data.results.forEach((character) => {
			globalMoviesList[character.id] = character;
			moviesElements.push(createMovieCard(character));
		});
		divMainContainer.innerHTML = "";
		divMainContainer.append(...moviesElements);
		
		const url = new URL(window.location);
		url.searchParams.set("page", page);
		window.history.pushState(null, "movie details", url.toString());
		createPaginationList(page);
	});

};

export const updateAllMovieState = () => {
	globalMoviesList = {};
	const moviesElements = [];

	return getAllCharacter().then((data) => { 
		divMainContainer.innerHTML = "";
		for (let i = 1; i <= data.info.pages; i++) {
			getPageCharacter(i).then((data) => {
				data.results.forEach((character) => {
					globalMoviesList[character.id] = character;
					moviesElements.push(createMovieCard(character));
				});
				divMainContainer.append(...moviesElements);
			}
	)}
		
		
	});
	

};

export const createDivClickToUp = () => {
	console.log(1);
	const divClickToUp = document.createElement("div");
	divClickToUp.classList.add("click-toUp-container", "arrow-8", "arrow-8-hide");
	window.addEventListener("scroll", () => {
		const { scrollY } = window;
		if (scrollY > 1350) {
			divClickToUp.classList.remove("arrow-8-hide");
		} else {
			divClickToUp.classList.add("arrow-8-hide");
		}
	});
	divClickToUp.addEventListener("click", () => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	});
	body.append(divClickToUp);
}

