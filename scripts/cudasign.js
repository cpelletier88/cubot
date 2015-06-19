module.exports = function(robot) {
    robot.respond(/get me a basic token/i, function(res) {
    	res.reply(btoa(process.env.CS_CLIENT_ID + ':' + process.env.CS_CLIENT_SECRET));
    });
};