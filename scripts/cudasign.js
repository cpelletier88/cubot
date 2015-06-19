var querystring = require('querystring');
var https = require('https');

module.exports = function(robot) {

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
			case 'development':
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

    	if (email == undefined || password == undefined) {
    		res.reply('You did provide and email and or password');
    	} else if(env == undefined) {
    		res.reply('You did provide an environment');
    	} else {
    		if (env == 'prod' || env == 'production') {
    			res.reply('Not creating users on prod right now');
    		} else {
    			var data = JSON.stringify({
		    		email: email,
		    		password: password
		    	});

		    	var options = {
		    		hostname: getHostName(env),
		    		path: '/user',
		    		method: 'POST',
		    		headers: {
		    			"Authorization": "Basic " + getEncodedToken(env),
		    			"User-Agent": "My Cubot app"
		    		}
		    	};

		    	if (env === 'eval') {
		    		options.path = '/api/user';
		    	}

		    	var req = https.request(options, function(httpResponse) {
					httpResponse.on('data', function(d) {
						res.reply(d.toString('utf8'));
					});
		    	});
		    	console.log(req);

		    	req.write(data);
		    	req.end();

				req.on('error', function(e) {
				  res.reply(e);
				});
    		}
	    }
    });
};