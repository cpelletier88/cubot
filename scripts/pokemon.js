// Description:
//   catch them all
//
// Commands:
//   hubot are there any pokemon nearby?


var querystring = require('querystring');
var unirest = require('unirest');
var _ = require('lodash');

module.exports = function(robot) {

    robot.hear(/nearby pokemon/i, function(res) {
    	var Request = unirest.get(process.env.POKEMON_PATH' + /raw_data);
    	Request.header('Accept', 'application/json').end(function (response) {
    		var responseJSON = JSON.parse(response.raw_body);
    		var pokemons = responseJSON.pokemons;
    		// walking distance 
    		// 33.621166, -117.926035
    		// 33.619300, -117.924680
    		
    		33.619997, -117.9254036

    		var nearbyPokemon = _.filter(pokemons, function(pokemon) {
    			return (pokemon.latitude > 33.619300 && pokemon.latitude < 33.621166) && 
    				(pokemon.longitude > -117.926035 && pokemon.longitude < -117.924680);

    		});

    		console.log(nearbyPokemon);

    		var nearbyNames = _.map(nearbyPokemon, function(poke) {
    			return poke.pokemon_name;
    		})

    		res.reply('There are ' + nearbyPokemon.length + ' pokemon nearby. (' + nearbyNames.join(', ') + ') - ' + process.env.POKEMON_PATH);
    	});
    });
};