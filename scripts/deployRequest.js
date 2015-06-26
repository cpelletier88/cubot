module.exports = function(robot) {
	return robot.router.post('/hubot/requestdeploy', function(req, res) {
		var data, room, environment, snapp, snappier, tacostand, sql;

		data = req.body.payload != null ? JSON.parse(req.body.payload) : req.body;
		environment = data.environment;
		snapp = data.snapp;
		snappier = data.snappier;
		tacostand = data.tacostand;
		sql = data.sql;

		robot.messageRoom('robots', 'testing');



		var data = JSON.stringify({
    		color: 'green',
    		message: '<strong>Test</strong>',
    		notify: 'true',
    		message_format: 'html'
    	});

		robot.http('https://api.hipchat.com/v2/room/1610182/notification?auth_token=' + process.env.HIPCHAT_API_KEY)
			.header('Content-Type', 'application/json')
			.post(data)(function(err, res, body) {
				return res.send('OK');
			});
	});
}