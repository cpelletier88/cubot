module.exports = function(robot) {
    robot.respond(/.+/i, function(res) {
    	if (res.message.user.name === 'Etan Karni') {
    		res.send("Leave me alone " + res.message.user.name + ' (trolletan)');
    	}
    });

    robot.hear(/\(tableflip\)/i, function(res) {
    	res.reply("Please Respect Tables   ┬─┬ノ(ಠ_ಠノ)");
    });
};