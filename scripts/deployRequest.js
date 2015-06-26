module.exports = function(robot) {
	return robot.router.post('/hubot/requestdeploy', function(req, res) {
		var data, room, environment, snapp, snappier, tacostand, sql;

		data = req.body.payload != null ? JSON.parse(req.body.payload) : req.body;
		environment = data.environment;
		snapp = data.snapp;
		snstaticpages = data.snstaticpages;
		tacostand = data.tacostand;
		sql = data.sql;
		snseats = data.snseats;
		snwebapi = data.snwebapi;
		snappier = data.snappier;

		robot.messageRoom('robots', 'testing');

		function addRow(name, value) {
			if(value) {
				deploymentRequest +='<tr><td>' + name + '</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>' + value + '</td></tr>';
			}
		}

		deploymentRequest = 'Deployment request for <strong>' + environment + '</strong><br />' + 
							'<table style="border: 1px solid black;"><thead><tr><th>Repo</th><th>&nbsp;</th><th>Branch</th></tr></thead>' +
  							'<tbody>';

		addRow('SNapp', snapp);
		addRow('SNStaticPages', snstaticpages);
		addRow('TacoStand', tacostand);
		addRow('SQL', sql);
		addRow('SNSeats', snseats);
		addRow('SNappier', snappier);
		addRow('SNWebAPI', snwebapi);

		deploymentRequest += '</tbody>' +
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
// curl -X POST -H "Content-Type: application/json" -d '{"environment":"qa", "snappier":"master", "snwebapi":"develop"}' http://cudasign-cubot.herokuapp.com/hubot/requestdeploy