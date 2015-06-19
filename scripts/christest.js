module.exports = function(robot) {
    robot.respond(/.+/, function(res) {
    	if (res.message.user.name === 'Etan Karni' || res.message.user.name === 'Chris Pelletier') {
    		res.send("Leave me alone " + res.message.user.name);
    	}
    });
};