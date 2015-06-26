module.exports = function(robot) {
	return robot.router.post('/hubot/requestdeploy', function(req, res) {
		var data, room, secret;
		room = req.params.room;
		data = req.body.payload != null ? JSON.parse(req.body.payload) : req.body;
		secret = data.secret;
		robot.messageRoom('robots', 'testing');



		var data = JSON.stringify({
    		color: 'green',
    		message: 'Lunch is here! (yey)',
    		notify: 'true',
    		message_format: 'text'
    	});
		    	
		robot.http('https://api.hipchat.com/v2/room/1610182/notification?auth_token=' + process.env.HIPCHAT_API_KEY)
			.header('Content-Type', 'application/json')
			.post(data)(function(err, res, body) {

			});
	});
}

curl -X POST -H "Content-Type: application/json" -d '{"secret":"C-TECH Astronomy"}' http://cudasign-cubot.herokuapp.com/hubot/requestdeploy
