let pokemonRepository = (function () {
	let pokemonList = [];
	let limit = 12;
	let apiUrl = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}`;

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

	// Function to add a new pokemon to the pokemonList array
	function add(pokemon) {
		// Check if the parameter is an object
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
				apiUrl = json.next;

				const results = json.results.map(function (item) {
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
				// Returns National Pokedex Number
				item.id = details.id;
			})
			.catch(function (e) {
				console.error(e);
			});
	}

	// Function to add a list item to the pokemon-list unordered list
	function addListItem(pokemon) {
		loadDetails(pokemon).then(() => {
			let col = document.createElement('div');
			col.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'mb-4');

			let listItem = document.createElement('li');
			listItem.classList.add('list-group-item', 'p-0', 'text-center');

			let button = document.createElement('button');
			button.classList.add('btn', 'btn-primary', 'btn-block');
			button.setAttribute('data-toggle', 'modal');
			button.setAttribute('data-target', '#pokemonModal');

			let img = document.createElement('img');
			img.src = pokemon.imageUrl;
			img.alt = pokemon.name;
			img.classList.add('img-fluid', 'mb-2');

			let span = document.createElement('span');
			span.innerText = pokemon.name;

			// Add event listener to the button
			addEventListener(button, pokemon);

			button.appendChild(span);
			button.appendChild(img);
			listItem.appendChild(button);
			col.appendChild(listItem);

			let list = document.querySelector('.pokemon-list');
			list.appendChild(col);
		});
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
		let modalTitle = document.querySelector('#pokemonModalLabel');
		let modalImage = document.querySelector('#pokemon-image');
		let modalName = document.querySelector('#pokemon-name');
		let modalId = document.querySelector('#pokemon-id');
		let modalHeight = document.querySelector('#pokemon-height');
		let modalTypes = document.querySelector('#pokemon-types');

		modalTitle.innerText = pokemon.name;
		modalImage.src = pokemon.imageUrl;
		modalName.innerText = pokemon.name;
		modalId.innerText = 'National Pokedex Number: ' + pokemon.id;
		modalHeight.innerText = 'Height: ' + convertDecimetersToFeetInches(pokemon.height);
		modalTypes.innerText = 'Types: ' + pokemon.types.map(capitalizeFirstLetter).join(', ');
	}
	// Load more button event listener
	document.querySelector('#load-more').addEventListener('click', async () => {
		await loadList();
		pokemonList.slice(-limit).forEach((pokemon) => addListItem(pokemon));
	});

	// Return an object with reference to functionality inside the IIFE
	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails,
	};
})();

pokemonRepository.loadList().then(function () {
	// Now the data is loaded!
	pokemonRepository.getAll().forEach(function (pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});
