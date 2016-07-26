// Description:
//   catch them all
//
// Commands:
//   hubot are there any pokemon nearby?


var querystring = require('querystring');
var unirest = require('unirest');
var _ = require('lodash');

module.exports = function(robot) {

	function getPokemonInArea(pokemons, area) {
		var nearbyPokemon = _.filter(pokemons, function(pokemon) {
			return (pokemon.latitude < area[0][0] && pokemon.latitude > area[1][0]) && 
				(pokemon.longitude > area[0][1] && pokemon.longitude < area[1][1]);

		});

		return nearbyPokemon;
	}

    robot.hear(/nearby pokemon/i, function(res) {
    	var Request = unirest.get(process.env.POKEMON_PATH + '/raw_data');
    	Request.header('Accept', 'application/json').end(function (response) {
    		var responseJSON = JSON.parse(response.raw_body);
    		var pokemons = responseJSON.pokemons;
    		
    		// walking distance 
    		var top_left = [33.621166, -117.926035];
    		var bottom_right = [33.619470, -117.924575];
    		
    		var nearbyPokemon = getPokemonInArea(pokemons, [top_left, bottom_right]);

    		var nearbyNames = _.map(nearbyPokemon, function(poke) {
    			return poke.pokemon_name;
    		})

    		var grammars = nearbyPokemon.length === 1 ? 'is' : 'are';

    		if (nearByNames.length) {
    			res.send('There ' + grammars + ' ' + nearbyPokemon.length + ' pokemon nearby. (' + nearbyNames.join(', ') + ') - ' + process.env.POKEMON_PATH);
    		} else {
    			res.send('There are no pokemon nearby =(')
    		}
    	});
    });
};