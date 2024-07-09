//create pokemonRepository variable to hold what IIFE will return
let pokemonRepository = (function () {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1025';

	//Function to add a new pokemon to the pokemonList array
	function add(pokemon) {
		//Check if the parameter is an object
		if (
			typeof pokemon === 'object' &&
			'name' in pokemon
			// 'detailsUrl' in pokemon'
		) {
			pokemonList.push(pokemon);
		} else {
			console.log('Error: Pokemon is not correct');
		}
	}

	// Function to return all pokemon in the pokemonList array
	function getAll() {
		return pokemonList;
	}

	//Function to add a list item to the pokemon-list unordered list
	function addListItem(pokemon) {
		let pokemonList = document.querySelector('.pokemon-list');
		let listpokemon = document.createElement('li');
		let button = document.createElement('button');
		button.innerText = pokemon.name;
		button.classList.add('button-class');
		// Add event listener to the button
		button.addEventListener('click', function (event) {
			showDetails(pokemon);
		});

		listpokemon.appendChild(button);
		pokemonList.appendChild(listpokemon);
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
				item.imageUrl = details.sprites.front_default;
				item.height = details.height;
				item.types = details.types.map((typeInfo) => typeInfo.type.name);
				//Returns National Pokedex Number
				item.id = details.id;
			})
			.catch(function (e) {
				console.error(e);
			});
	}

	function showDetails(pokemon) {
		loadDetails(pokemon).then(function () {
			console.log(pokemon);
		});
	}

	//Return an object with reference to functionality inside the IIFE
	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails,
		showDetails: showDetails,
	};
})();

pokemonRepository.loadList().then(function () {
	// Now the data is loaded!
	pokemonRepository.getAll().forEach(function (pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});
