//create pokemonRepository variable to hold what IIFE will return
let pokemonRepository = (function () {
	let repository = [];
	repository = [
		{ name: 'Charizard', height: '5\' 07"', types: ['Fire', 'Flying'] },
		{ name: 'Blastoise', height: '5\' 03"', types: ['Water'] },
		{ name: 'Beedrill', height: '3\' 03"', types: ['Bug', 'Poison'] },
		{ name: 'Ninetales', height: '3\' 07"', types: ['Fire'] },
		{ name: 'Vileplume', height: '3\' 11"', types: ['Grass', 'Poison'] },
	];

	//Function to add a new pokemon to the pokemonList array
	function add(pokemon) {
		//Check if the parameter is an object
		if (typeof pokemon === 'object' && pokemon !== null && 'name' in pokemon && 'height' in pokemon && 'types' in pokemon) {
			repository.push(pokemon);
		} else {
			document.write('Error: Pokemon is not correct');
		}
	}

	//Function to return all pokemon in the pokemonList array
	function getAll() {
		return repository;
	}

	// Function to log pokemon details to console
	function showDetails(pokemon) {
		console.log(`Name: ${pokemon.name}, Height: ${pokemon.height}, Types:     
    ${pokemon.types.join(', ')}`);
	}

	//Function to add a list item to the pokemon-list unordered list
	function addListItem(pokemon) {
		let pokemonList = document.querySelector('.pokemon-list');
		let listpokemon = document.createElement('li');
		let button = document.createElement('button');
		button.innerText = pokemon.name;
		button.classList.add('button-class');
		// Add event listener to the button
		button.addEventListener('click', function () {
			showDetails(pokemon);
		});

		listpokemon.appendChild(button);
		pokemonList.appendChild(listpokemon);
	}

	//Return an object with reference to the add, getAll, addListItem functions
	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
	};
})();

// Iterate over each pokemon in the repository
pokemonRepository.add({ name: 'Pikachu', height: 0.3, types: ['Electric'] });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
	pokemonRepository.addListItem(pokemon);
});
