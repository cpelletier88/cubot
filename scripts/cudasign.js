// Description:
//   Make calls to cudasign api through cubot
//
// Commands:
//   hubot create user <email>,<password> on <server> - Returns json data of CudaSign response
//   hubot create token for <email>,<password>,<scope> on <server> - Returns json data of CudaSign response


var querystring = require('querystring');
var unirest = require('unirest');
var _ = require('lodash');

module.exports = function(robot) {

	var acceptedServerNames = ['eval', 'evaluation', 'dev', 'development', 'rc', 'prod', 'production'];

	function getEncodedToken(env) {
		if(env === 'eval' || env === 'evaluation') {
			return 'MGZjY2RiYzczNTgxY2EwZjliZjhjMzc5ZTZhOTY4MTM6MzcxOWExMjRiY2ZjMDNjNTM0ZDRmNWMwNWI1YTE5NmI=';
		} else if(env === 'rc') {
			return (new Buffer(process.env.CS_RC_CLIENT_ID + ':' + process.env.CS_RC_CLIENT_SECRET).toString('base64'));
		} else {
			return (new Buffer(process.env.CS_CLIENT_ID + ':' + process.env.CS_CLIENT_SECRET).toString('base64'));
		}
	}

	function getHostName(env) {
		var hostname;
		switch(env) {
			case 'eval':
				hostname = 'capi-eval.signnow.com';
				break;
			case 'evaluation':
				hostname = 'capi-eval.signnow.com';
				break;
			case 'dev':
				hostname = 'api-dev.signnow.com';
				break;
			case 'development':
				hostname = 'api-dev.signnow.com';
				break;
			case 'rc':
				hostname = 'api-rc.signnow.com';
				break;	
			default:
				hostname = 'capi-eval.signnow.com';
				break;
		}
		return hostname;
	}

    robot.respond(/get me a basic token for (.*)/i, function(res) {
    	var env = res.match[1].trim();
    	res.reply(getEncodedToken(env));
    });

    robot.respond(/create user (.*) on (.*)/i, function(res) {
    	var userResponse;
    	var user = res.match[1].trim().split(',');
    	var email = user[0].trim();
    	var password = user[1].trim();
    	var env = res.match[2].trim();

    	if (email === undefined || password === undefined) {
    		res.reply('You did not provide an email and or password');
    	} else if(env === undefined) {
    		res.reply('You did not provide an environment/server');
    	} else if(!_.includes(acceptedServerNames, env)) {
    		res.reply('You did not provide a valid server name');
    	} else {
    		if (env == 'prod' || env == 'production') {
    			res.reply('Not creating users on prod right now');
    		} else {
    			var data = JSON.stringify({
		    		email: email,
		    		password: password
		    	});

				var endpoint;
				if(env === 'eval' || env === 'evaluation') {
		    		endpoint = '/api/user';
		    	} else {
		    		endpoint = '/user';
		    	}

				unirest.post('https://' + getHostName(env) + endpoint)
					.header('Authorization', 'Basic ' + getEncodedToken(env))
					.header('User-Agent', 'My Cubot ap')
					.header('Content-Type', 'application/json')
					.header('Content-Length', data.length)
					.send(data)
					.end(function(response) {
						res.reply(response.raw_body);
					});
    		}
	    }
    });

	robot.respond(/create token for (.*) on (.*)/i, function(res) {
		var user = res.match[1].trim().split(',');
    	var email = user[0].trim();
    	var password = user[1].trim();
    	var scope = user[2] ? user[2].trim() : '*';
    	var env = res.match[2].trim();

    	if (email === undefined || password === undefined) {
    		res.reply('You did not provide an email, password, and or scope');
    	} else if(env === undefined) {
    		res.reply('You did not provide an environment/server');
    	} else if(!_.includes(acceptedServerNames, env)) {
    		res.reply('You did not provide a valid server name');
    	} else {
    		var data = querystring.stringify({
		    	username: email,
		    	password: password,
		    	'grant_type': 'password',
		    	scope: scope
		    });

			var endpoint;
			if(env === 'eval' || env === 'evaluation') {
	    		endpoint = '/api/oauth2/token';
	    	} else {
	    		endpoint = '/oauth2/token';
	    	}

			unirest.post('https://' + getHostName(env) + endpoint)
					.header('Authorization', 'Basic ' + getEncodedToken(env))
					.header('User-Agent', 'My Cubot ap')
					.header('Content-Type', 'application/x-www-form-urlencoded')
					.header('Content-Length', data.length)
					.send(data)
					.end(function(response) {
						res.reply(response.raw_body);
					});
    	}
	});
};