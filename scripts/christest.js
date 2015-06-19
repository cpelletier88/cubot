module.exports = function(robot) {
    robot.hear(/testing/i, function(res) {
    	res.reply(res.message.user.name);
    	// if(res.message.user.name === 'Shell') {
    	// 	res.reply('shut up shell');
    	// }
    });
};