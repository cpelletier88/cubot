// Description:
//   catch them all
//
// Commands:
//   hubot are there any pokemon nearby?


var querystring = require('querystring');
var unirest = require('unirest');
var _ = require('lodash');
var pokemonNames = {"1":"Bulbasaur","2":"Ivysaur","3":"Venusaur","4":"Charmander","5":"Charmeleon","6":"Charizard","7":"Squirtle","8":"Wartortle","9":"Blastoise","10":"Caterpie","11":"Metapod","12":"Butterfree","13":"Weedle","14":"Kakuna","15":"Beedrill","16":"Pidgey","17":"Pidgeotto","18":"Pidgeot","19":"Rattata","20":"Raticate","21":"Spearow","22":"Fearow","23":"Ekans","24":"Arbok","25":"Pikachu","26":"Raichu","27":"Sandshrew","28":"Sandslash","29":"Nidoran♀","30":"Nidorina","31":"Nidoqueen","32":"Nidoran♂","33":"Nidorino","34":"Nidoking","35":"Clefairy","36":"Clefable","37":"Vulpix","38":"Ninetales","39":"Jigglypuff","40":"Wigglytuff","41":"Zubat","42":"Golbat","43":"Oddish","44":"Gloom","45":"Vileplume","46":"Paras","47":"Parasect","48":"Venonat","49":"Venomoth","50":"Diglett","51":"Dugtrio","52":"Meowth","53":"Persian","54":"Psyduck","55":"Golduck","56":"Mankey","57":"Primeape","58":"Growlithe","59":"Arcanine","60":"Poliwag","61":"Poliwhirl","62":"Poliwrath","63":"Abra","64":"Kadabra","65":"Alakazam","66":"Machop","67":"Machoke","68":"Machamp","69":"Bellsprout","70":"Weepinbell","71":"Victreebel","72":"Tentacool","73":"Tentacruel","74":"Geodude","75":"Graveler","76":"Golem","77":"Ponyta","78":"Rapidash","79":"Slowpoke","80":"Slowbro","81":"Magnemite","82":"Magneton","83":"Farfetch'd","84":"Doduo","85":"Dodrio","86":"Seel","87":"Dewgong","88":"Grimer","89":"Muk","90":"Shellder","91":"Cloyster","92":"Gastly","93":"Haunter","94":"Gengar","95":"Onix","96":"Drowzee","97":"Hypno","98":"Krabby","99":"Kingler","100":"Voltorb","101":"Electrode","102":"Exeggcute","103":"Exeggutor","104":"Cubone","105":"Marowak","106":"Hitmonlee","107":"Hitmonchan","108":"Lickitung","109":"Koffing","110":"Weezing","111":"Rhyhorn","112":"Rhydon","113":"Chansey","114":"Tangela","115":"Kangaskhan","116":"Horsea","117":"Seadra","118":"Goldeen","119":"Seaking","120":"Staryu","121":"Starmie","122":"Mr. Mime","123":"Scyther","124":"Jynx","125":"Electabuzz","126":"Magmar","127":"Pinsir","128":"Tauros","129":"Magikarp","130":"Gyarados","131":"Lapras","132":"Ditto","133":"Eevee","134":"Vaporeon","135":"Jolteon","136":"Flareon","137":"Porygon","138":"Omanyte","139":"Omastar","140":"Kabuto","141":"Kabutops","142":"Aerodactyl","143":"Snorlax","144":"Articuno","145":"Zapdos","146":"Moltres","147":"Dratini","148":"Dragonair","149":"Dragonite","150":"Mewtwo","151":"Mew"};

module.exports = function(robot) {
	// walking distance 
	var top_left = [33.621166, -117.926035];
	var bottom_right = [33.619470, -117.924575];

	function isInArea(pokemon, area) {
		var latitude = pokemon.latitude;
		var longitude = pokemon.longitude;

		_.each([latitude, longitude], function(c) {
			if (_.isString(c)) {
				c = parseFloat(c);
			}
		});
		
		return (latitude < area[0][0] && latitude > area[1][0]) && 
			(longitude > area[0][1] && longitude < area[1][1]);
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
		console.log(data);

		if (data.type === 'pokemon') {
			var pokemon = data.message;

			if (isInArea(pokemon, [top_left, bottom_right])) {
				var data = JSON.stringify({
		    		color: 'green',
		    		message: pokemonNames[pokemon.pokemon_id] + ' just spawned by the office',
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