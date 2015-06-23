var _ = require('lodash');

module.exports = function(robot) {
	var etanResponses = [
		'Leave me alone <%= user %>! (trolletan)', 
		'You are really starting to annoy me <%= user %>. (disapproval)',
		'@Mullen can you tell <%= user %> to stop bothering me? (facepalm)',
		'@phi can you tell <%= user %> to leave me alone? '
	];

    robot.respond(/.+/i, function(res) {
    	if (res.message.user.name === 'Etan Karni') {
    		var response = res.random(etanResponses);
    		var compiled = _.template(response);
    		res.send(compiled({'user': res.message.user.name}));
    	}
    });

    robot.respond(/(you are|you're) mean/i, function(res) {
    	res.send('Only to @EtanKarni');
    });

    robot.hear(/\(tableflip\)/i, function(res) {
    	res.reply("Please Respect Tables   ┬─┬ノ(ಠ_ಠノ)");
    });
};