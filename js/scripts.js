//create pokemonRepository variable to hold what IIFE will return
let pokemonRepository = (function () {
	let pokemonList = [];
	pokemonList = [
		{ name: 'Charizard', height: '5\' 07"', type: ['fire', 'flying'] },
		{ name: 'Blastoise', height: '5\' 03"', type: ['water'] },
		{ name: 'Beedrill', height: '3\' 03"', type: ['bug', 'poison'] },
		{ name: 'Ninetales', height: '3\' 07"', type: ['fire'] },
		{ name: 'Vileplume', height: '3\' 11"', type: ['grass', 'poison'] },
	];

	//Function to add a new pokemon to the pokemonList array
	function add(pokemon) {
		//Check if the parameter is an object
		if (typeof pokemon === 'object' && pokemon !== null) {
			pokemonList.push(pokemon);
		} else {
			document.write('Error: Only objects can be added to the pokemonList');
		}
	}

	//Function to return all pokemon in the pokemonList array
	function getAll() {
		return pokemonList;
	}

	//Return an object with reference to the add and getAll functions
	return {
		add: add,
		getAll: getAll,
	};
})();

// Iterate over each pokemon in the repository
pokemonRepository.getAll().forEach(function (pokemon) {
	//Create a variable heightInInches which converts a height string in the format "feet'inches "" to inches
	let heightInInches = parseInt(pokemon.height.split("' ")[0]) * 12 + parseInt(pokemon.height.split("' ")[1].replace('"', ''));

	//Create conditional expression that will print the name and height of all Pokemon and adds text string to the tallest Pokemon
	if (heightInInches > 63 && heightInInches < 75) {
		document.write(pokemon.name + ' (Height: ' + pokemon.height + ')', ' - Wow, that’s big! ' + '<br>');
	} else {
		document.write(pokemon.name + ' (Height: ' + pokemon.height + ')' + '<br>');
	}
});
