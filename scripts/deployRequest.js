module.exports = function(robot) {
	robot.router.post('/hubot/requestdeploy', function(req, res) {
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
							'<table><tr><tr><td><strong>Repo</strong></td><td>&nbsp;</td><td><strong>Branch</strong></td></tr></tr>' +
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

		robot.http('https://api.hipchat.com/v2/room/1610182/notification?auth_token=' + process.env.DEPLOY_HIPCHAT_API_KEY)
			.header('Content-Type', 'application/json')
			.post(data)(function(err, res, body) {
			});

		return res.send('OK');

	});
	
	robot.hear(/deployment request url/i, function(msg){
		msg.send('You can make requests here: http://cudasign-cubot.herokuapp.com/hubot/deploy');
	});
}

// curl -X POST -H "Content-Type: application/json" -d '{"environment":"rc", "snapp":"master", "snstaticpages":"master", "tacostand":"master", "sql":"none"}' http://cudasign-cubot.herokuapp.com/hubot/requestdeploy
// curl -X POST -H "Content-Type: application/json" -d '{"environment":"qa", "snappier":"master", "snwebapi":"develop"}' http://cudasign-cubot.herokuapp.com/hubot/requestdeploy