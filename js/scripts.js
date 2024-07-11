//create pokemonRepository variable to hold what IIFE will return
let pokemonRepository = (function () {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1025';

	// Function to capitalize the first letter of a string
	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	// Function to convert decimeters to feet and inches
	function convertDecimetersToFeetInches(decimeters) {
		let inches = decimeters * 3.937; // 1 decimeter is approximately 3.937 inches
		let feet = Math.floor(inches / 12);
		inches = Math.round(inches % 12);
		return `${feet} ft ${inches} in`;
	}

	// Function to return all pokemon in the pokemonList array
	function getAll() {
		return pokemonList;
	}

	//Function to add a new pokemon to the pokemonList array
	function add(pokemon) {
		//Check if the parameter is an object
		if (typeof pokemon === 'object' && 'name' in pokemon) {
			// Capitalize the first letter of the pokemon name
			pokemon.name = capitalizeFirstLetter(pokemon.name);
			pokemonList.push(pokemon);
		} else {
			console.log('Error: Pokemon is not correct');
		}
	}

	function loadList() {
		return fetch(apiUrl)
			.then(function (response) {
				return response.json();
			})
			.then(function (json) {
				json.results.forEach(function (item) {
					let pokemon = {
						name: item.name,
						detailsUrl: item.url,
					};
					add(pokemon);
				});
			})
			.catch(function (e) {
				console.error(e);
			});
	}

	function loadDetails(item) {
		let url = item.detailsUrl;
		return fetch(url)
			.then(function (response) {
				return response.json();
			})
			.then(function (details) {
				// Now we add the details to the item
				item.imageUrl = details.sprites.other.home.front_default;
				item.height = details.height;
				item.types = details.types.map((typeInfo) => typeInfo.type.name);
				//Returns National Pokedex Number
				item.id = details.id;
			})
			.catch(function (e) {
				console.error(e);
			});
	}

	//Function to add a list item to the pokemon-list unordered list
	function addListItem(pokemon) {
		let listItem = document.createElement('li');
		let button = document.createElement('button');
		button.innerText = pokemon.name;
		button.classList.add('pokemon-list__button');
		// Add event listener to the button
		addEventListener(button, pokemon);

		listItem.appendChild(button);

		let list = document.querySelector('.pokemon-list');
		list.appendChild(listItem);
	}

	function addEventListener(button, pokemon) {
		button.addEventListener('click', () => {
			showDetails(pokemon);
		});
	}

	function showDetails(pokemon) {
		loadDetails(pokemon).then(function () {
			showModal(pokemon);
		});
	}

	function showModal(pokemon) {
		let modalContainer = document.querySelector('#modal-container');
		// Clear all exisiting modal content
		modalContainer.innerHTML = '';

		let modal = document.createElement('div');
		modal.classList.add('modal');

		// Add the new modal content
		let closeButtonElement = document.createElement('button');
		closeButtonElement.classList.add('modal-close');
		closeButtonElement.innerText = 'Close';
		closeButtonElement.addEventListener('click', hideModal);

		let titleElement = document.createElement('h1');
		titleElement.innerText = pokemon.name;

		let imageElement = document.createElement('img');
		imageElement.src = pokemon.imageUrl;

		let idElement = document.createElement('p');
		idElement.innerText = 'National Pokedex Number: ' + pokemon.id;

		let heightElement = document.createElement('p');
		heightElement.innerText = 'Height: ' + convertDecimetersToFeetInches(pokemon.height);

		let typesElement = document.createElement('p');
		// Capiatalize the first letter of each type
		typesElement.innerText = pokemon.types.map(capitalizeFirstLetter).join(', ');

		modal.appendChild(closeButtonElement);
		modal.appendChild(titleElement);
		modal.appendChild(imageElement);
		modal.appendChild(idElement);
		modal.appendChild(heightElement);
		modal.appendChild(typesElement);
		modalContainer.appendChild(modal);

		modalContainer.classList.add('is-visible');

		modalContainer.addEventListener('click', (e) => {
			let target = e.target;
			if (target === modalContainer) {
				hideModal();
			}
		});
	}

	function hideModal() {
		let modalContainer = document.querySelector('#modal-container');
		modalContainer.classList.remove('is-visible');
	}

	window.addEventListener('keydown', (e) => {
		let modalContainer = document.querySelector('#modal-container');
		if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
			hideModal();
		}
	});

	//Return an object with reference to functionality inside the IIFE
	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails,
		hideModal: hideModal,
	};
})();

pokemonRepository.loadList().then(function () {
	// Now the data is loaded!
	pokemonRepository.getAll().forEach(function (pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});
