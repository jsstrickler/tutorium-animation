/*
 * Convenient Details are Convenient.
 * Stores the current state of details tags in localstorage.
 * This is very simplistic, it just takes the details tags in order
 * of their appearance in the DOM.
 */

// we don't want to interfere with other pages
// so we take a very unique string as key for our data in localStorage.
const localStorageKey = `convenient-details-${window.location}`;

const tags = document.querySelectorAll("details");

let ignoreInitialRun = true;

for (let i = 0; i < tags.length; i++) {
	const tag = tags[i];
	// whenever any element is toggled, just store the new state.
	tag.addEventListener("toggle", saveToStorage);
}

function loadFromStorage() {
	const statesString = localStorage.getItem(localStorageKey);
	const states = JSON.parse(statesString);

	for (let i = 0; i < tags.length; i++) {
		if (states !== null && i < states.length) {
			tags[i].open = states[i];
		} else {
			// default to "open"
			tags[i].open = true;
		}
	}
}

function saveToStorage() {
	if (ignoreInitialRun) return;
	const data = [];
	for (let i = 0; i < tags.length; i++) {
		const tag = tags[i];
		data.push(tag.open);
	}
	localStorage.setItem(localStorageKey, JSON.stringify(data));
}

// after loading, a ton of events get fired. We don't want to store them
// we would overwrite an existing pattern before we even had the chance to
// restore something.
setTimeout(function () {
	loadFromStorage();
	ignoreInitialRun = false
}, 25);
