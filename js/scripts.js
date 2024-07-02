//Create a new variable called pokemonList and assign to it a blank array.
let pokemonList = [];

//Add several objects to the array and at least 3 key-value pairs for each object.
pokemonList = [
	{ name: 'Charizard', height: '5\' 07"', type: ['fire', 'flying'] },
	{ name: 'Blastoise', height: '5\' 03"', type: ['water'] },
	{ name: 'Beedrill', height: '3\' 03"', type: ['bug', 'poison'] },
	{ name: 'Ninetales', height: '3\' 07"', type: ['fire'] },
	{ name: 'Vileplume', height: '3\' 11"', type: ['grass', 'poison'] },
];

// Iterate over each element in the pokemonList array, assigning each element to the variable 'pokemon'
pokemonList.forEach(function (pokemon) {
	//Create a variable heightInInches which converts a height string in the format "feet'inches "" to inches
	let heightInInches = parseInt(pokemon.height.split("' ")[0]) * 12 + parseInt(pokemon.height.split("' ")[1].replace('"', ''));

	//Create conditional expression that will print the name and height of all Pokemon and adds text string to the tallest Pokemon
	if (heightInInches > 63 && heightInInches < 75) {
		document.write(pokemon.name + ' (Height: ' + pokemon.height + ')', ' - Wow, that’s big! ' + '<br>');
	} else {
		document.write(pokemon.name + ' (Height: ' + pokemon.height + ')' + '<br>');
	}
});
