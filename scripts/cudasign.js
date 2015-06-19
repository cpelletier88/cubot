module.exports = function(robot) {
	var getBasicToken = function(env) {
		if(env === 'eval') {
			return 'MGZjY2RiYzczNTgxY2EwZjliZjhjMzc5ZTZhOTY4MTM6MzcxOWExMjRiY2ZjMDNjNTM0ZDRmNWMwNWI1YTE5NmI=';
		} else {
			return new Buffer(process.env.CS_CLIENT_ID + ':' + process.env.CS_CLIENT_SECRET, 'base64').toString('utf8');
		}
	};

    robot.respond(/get me a basic token for (.*)/i, function(res) {
    	var env= res.match[1];
    	res.reply(getBasicToken(env));
    });
};