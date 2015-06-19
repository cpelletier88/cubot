module.exports = function(robot) {
    robot.respond(/.+/, function(res) {
    	if (res.message.user.name === 'Etan Karni') {
    		res.send("Leave me alone " + res.message.user.name);
    	}
    });
};