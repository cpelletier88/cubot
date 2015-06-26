module.exports = function(robot) {
	return robot.router.post('/hubot/requestdeploy', function(req, res) {
		var data, room, secret;
		room = req.params.room;
		data = req.body.payload != null ? JSON.parse(req.body.payload) : req.body;
		secret = data.secret;
		robot.messageRoom('robots', 'testing');
		return res.send('OK');
	});
}