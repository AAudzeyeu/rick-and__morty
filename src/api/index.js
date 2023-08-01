import { createMovieCard, divMainContainer } from "../list/main";
import { createPaginationList, divPagination} from "../list/pagination"

const baseUrl = 'https://rickandmortyapi.com/api';
const { body } = document;

export let globalMoviesList = {};

const blockContent = (promise) => {
	const divPreloader = document.createElement("div");
	divPreloader.classList.add("preloader");
	const divPreloaderRow = document.createElement("div");
	divPreloaderRow.classList.add("preloader__row");
	divPreloader.append(divPreloaderRow);
	const divPreloaderItemOne = document.createElement("div");
	divPreloaderItemOne.classList.add("preloader__item");
	divPreloaderRow.append(divPreloaderItemOne);
	const divPreloaderItemTwo = document.createElement("div");
	divPreloaderItemTwo.classList.add("preloader__item");
	divPreloaderRow.append(divPreloaderItemTwo);

	body.append(divPreloader);

	return promise.finally(() => {
		divPreloader.remove();

	});
};

export const getPageCharacter = (page = 1) => 
	blockContent(
		fetch(`${baseUrl}/character/?page=${page}`).then((data) => data.json()
	)
);
export const getAllCharacter = () => 
blockContent(
	fetch(`${baseUrl}/character`).then((data) => data.json()
	)
);

export const getOneCharacter = (id) => 
blockContent(
fetch(`${baseUrl}/character/${id}`).then((data) => data.json()
	)
);

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

