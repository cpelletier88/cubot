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
		webapi = data.webapi;
		snappier = data.snappier;

		robot.messageRoom('robots', 'testing');

		function addRow(name, value) {
			if(value) {
				deploymentRequest +='<tr><td>' + name + '</td><td>&nbsp;&nbsp;</td><td>' + value + '</td></tr>';
			}
		}

		deploymentRequest = 'Deployment request for <strong>' + environment + '</strong><br />' + 
							'<table border="1" cell-padding="3" cell-spacing="5"><thead><tr><th text-align="left">Repo</th><th text-align="left">&nbsp;</th>th text-align="left">Branch</th></tr></thead>' +
  							'<tbody>';

		addRow('SNapp', snapp);
		addRow('SNStaticPages', snstaticpages);
		addRow('TacoStand', tacostand);
		addRow('SQL', sql);
		addRow('SNSeats', snseats);
		addRow('SNappier', snappier);
		addRow('WebAPI', webapi);

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