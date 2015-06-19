module.exports = function(robot) {
    robot.hear(/.+/i, function(res) {
    	res.send(res);
    	// if(res.message.user.name === 'Shell') {
    	// 	res.reply('shut up shell');
    	// }
    });
};