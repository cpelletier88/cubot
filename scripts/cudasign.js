module.exports = function(robot) {

	function getEncodedToken(env) {
		if(env === 'eval' || !process.env.CS_CLIENT_ID) {
			return 'MGZjY2RiYzczNTgxY2EwZjliZjhjMzc5ZTZhOTY4MTM6MzcxOWExMjRiY2ZjMDNjNTM0ZDRmNWMwNWI1YTE5NmI=';
		} else {
			return (new Buffer(process.env.CS_CLIENT_ID + ':' + process.env.CS_CLIENT_SECRET).toString('base64'));
		}
	}

    robot.respond(/get me a basic token for (.*)/i, function(res) {
    	var env = res.match[1].trim();
    	res.reply(getEncodedToken(env));
    });
};