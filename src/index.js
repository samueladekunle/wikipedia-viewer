const jsonp = require("jsonp");

window.mdc.autoInit();

const wikiForm = document.querySelector("#wiki-form");
const wikiFormContainer = document.querySelector("#wiki-form-container");
const wikiCardsContainer = document.querySelector("#wiki-cards-container");

let wikiCardsList = [];

wikiForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const value = event.target.elements.search.value;
	const query = value.trim();
	const wikiFormContainerStyle = wikiFormContainer.style;

	if (query) {
		// Move the form up.
		wikiFormContainerStyle.animationName = "move-wiki-form-up";
		wikiFormContainerStyle.animationPlayState = "running";

		performJSONP(query);
	} else {
		if (wikiCardsContainer.innerHTML) {
			wikiCardsContainer.innerHTML = "";
		}

		if (wikiFormContainerStyle.animationPlayState) {
			wikiFormContainerStyle.animationName = "move-wiki-form-down";
			wikiFormContainerStyle.animationPlayState = "running";
		}
	}
});

const performJSONP = (query) => {
	const request = `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${query}&callback=JSON_CALLBACK`;

	jsonp(request, (err, data) => {
		if (err) {
			console.log(`Error: ${err}`);
		} else {
			const pages = data.query.pages;

			// Empty the wikiCardsList array.
			wikiCardsList=[];

			for (let page in pages) {
				let id = pages[page]["pageid"],
					thumbnail = pages[page]["thumbnail"] ? pages[page]["thumbnail"]["source"] : "",
					title = pages[page]["title"],
					body = pages[page]["extract"];

				wikiCardsList.push({ id: id, title: title, body: body, thumbnail: thumbnail });
			}
			
			createWikiCards(wikiCardsList);
		}
	});
};

const createWikiCards = (cards) => {
	wikiCardsContainer.innerHTML = cards.map(getWikiCardElement).join("");
}

const getWikiCardElement = (card) => {
	return `
	<div class="wiki-card">
		<div class="mdc-card">
			<section class="mdc-card__primary">
				<div class="wiki-card__avatar" style="background-image:url(${card.thumbnail});"></div>
				<h1 class="mdc-card__title mdc-card__title--large">${card.title}</h1>
			</section>
			<section class="mdc-card__supporting-text">
				${card.body}
			</section>
			<section class="mdc-card__actions">
				<a class="mdc-button mdc-button--compact mdc-ripple-surface mdc-card__action" target="_blank" href="https://en.wikipedia.org/?curid=${card.id}">Read more</a>
			</section>
		</div>
	</div>
	`;
};