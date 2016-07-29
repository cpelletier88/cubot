// Description:
//   catch them all
//
// Commands:
//   hubot are there any pokemon nearby?


var querystring = require('querystring');
var unirest = require('unirest');
var _ = require('lodash');

module.exports = function(robot) {
	// walking distance 
	var top_left = [33.621166, -117.926035];
	var bottom_right = [33.619470, -117.924575];

	function isInArea(pokemon, area) {
		return (pokemon.latitude < area[0][0] && pokemon.latitude > area[1][0]) && 
			(pokemon.longitude > area[0][1] && pokemon.longitude < area[1][1]);
	}

	function getPokemonInArea(pokemons, area) {
		var nearbyPokemon = _.filter(pokemons, function(pokemon) {
			isInArea(pokemon, area);
		});

		return nearbyPokemon;
	}

    robot.hear(/nearby pokemon/i, function(res) {
    	var Request = unirest.get(process.env.POKEMON_PATH + '/raw_data');
    	Request.header('Accept', 'application/json').end(function (response) {
    		var responseJSON = JSON.parse(response.raw_body);
    		var pokemons = responseJSON.pokemons;
    		    		
    		var nearbyPokemon = getPokemonInArea(pokemons, [top_left, bottom_right]);
    		var nearbyNames = _.map(nearbyPokemon, function(poke) {
    			return poke.pokemon_name;
    		})

    		var grammars = nearbyPokemon.length === 1 ? 'is' : 'are';

    		if (nearbyPokemon.length) {
    			res.send('There ' + grammars + ' ' + nearbyPokemon.length + ' pokemon nearby. (' + nearbyNames.join(', ') + ') - ' + process.env.POKEMON_PATH);
    		} else {
    			res.send('There are no pokemon nearby =(')
    		}
    	});
    });

    robot.router.post('/hubot/pokeman_sighting', function(req, res) {
		var data;
		data = req.body.payload != null ? JSON.parse(req.body.payload) : req.body;
		var pokemon;

		if (data.type === 'pokemon') {
			pokemon = data.message;

			if (isInArea(pokemon, [top_left, bottom_right])) {
				var data = JSON.stringify({
		    		color: 'green',
		    		message: pokemon_id + ' just spawned by the office',
		    		notify: 'true',
		    		message_format: 'html'
		    	});

				robot.http('https://api.hipchat.com/v2/room/1610182/notification?auth_token=' + process.env.DEPLOY_HIPCHAT_API_KEY)
					.header('Content-Type', 'application/json')
					.post(data)(function(err, res, body) {
					});				
			}
		}
	});

    robot.hear(/should i transfer my dragonair/i, function(res) {
    	res.send('WWCPD?');
    });
};