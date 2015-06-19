module.exports = function(robot) {
    robot.hear(/.+/i, function(res) {
    	res.send("Hello " + res.message.user.name);
    	// if(res.message.user.name === 'Shell') {
    	// 	res.reply('shut up shell');
    	// }
    });
};