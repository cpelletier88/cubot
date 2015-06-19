module.exports = function(robot) {
    robot.respond(/.+/i, function(res) {
    	if (res.message.user.name === 'Etan Karni') {
    		res.send("Leave me alone " + res.message.user.name + ' (trolletan)');
    	}
    });
};