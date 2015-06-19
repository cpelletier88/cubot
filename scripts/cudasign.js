module.exports = function(robot) {
    robot.respond(/get me a basic token/i, function(res) {
    	res.reply(new Buffer(process.env.CS_CLIENT_ID + ':' + process.env.CS_CLIENT_SECRET).toString('base64'));
    });
};