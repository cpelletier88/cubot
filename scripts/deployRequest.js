module.exports = function(robot) {
	return robot.router.post('/hubot/requestdeploy', function(req, res) {
		var data, room, environment, snapp, snappier, tacostand, sql;

		data = req.body.payload != null ? JSON.parse(req.body.payload) : req.body;
		environment = data.environment;
		snapp = data.snapp;
		snstaticpages = data.snstaticpages;
		tacostand = data.tacostand;
		sql = data.sql;

		robot.messageRoom('robots', 'testing');

		deploymentRequest = 'Deployment request for <strong>' + environment + '</strong><br />' + 
							'<table border="1" cell-padding="3" cell-spacing="5"><thead><tr><th>Repo</th><th>Branch</th></tr></thead>' +
  							'<tbody>' + 
  							'<tr><td>SNapp</td><td>' + snapp + '</td></tr>' + 
  							'<tr><td>SNStaticPages</td><td>' + snstaticpages + '</td></tr>' + 
  							'<tr><td>TacoStand</td><td>' + tacostand + '</td></tr>' + 
  							'<tr><td>SQL</td><td>' + sql + '</td></tr>' + 
  							'</tbody>' +
  							'</table>';

		var data = JSON.stringify({
    		color: 'green',
    		message: deploymentRequest,
    		notify: 'true',
    		message_format: 'html'
    	});

		robot.http('https://api.hipchat.com/v2/room/1610182/notification?auth_token=' + process.env.HIPCHAT_API_KEY)
			.header('Content-Type', 'application/json')
			.post(data)(function(err, res, body) {
			});

		return res.send('OK');

	});
}

// curl -X POST -H "Content-Type: application/json" -d '{"environment":"rc", "snapp":"master", "snstaticpages":"master", "tacostand":"master", "sql":"none"}' http://cudasign-cubot.herokuapp.com/hubot/requestdeploy