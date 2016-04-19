module.exports = function(robot) {
	robot.router.post('/hubot/requestdeploy', function(req, res) {
		var data, environment, snapp, snappier, tacostand, sql, snseats, snwebapi, tag, snseatsapi, snstaticpages, requester;

		data = req.body.payload != null ? JSON.parse(req.body.payload) : req.body;
		environment = data.environment;
		snapp = data.snapp;
		snstaticpages = data.snstaticpages;
		tacostand = data.tacostand;
		sql = data.sql;
		snseats = data.snseats;
		snwebapi = data.snwebapi;
		snappier = data.snappier;
		requester = data.requester;
		tag = data.tag;
		snseatsapi = data.snseatsapi;

		var jade = require('jade');
		var fn = jade.compileFile('./views/deploy.tpl.jade');


		if(!requester) {
			var html = fn({
				message: {
					error: 'Requester name required!'
				}				
			});

			return res.send(html);
		}

		if(!snapp && !snstaticpages && !tacostand && !snseats && !snappier && !snwebapi && !snseatsapi) {
			var html = fn({
				message: {
					error: 'You need to make a request!'
				}				
			});

			return res.send(html);
		}

		function addRow(name, value) {
			if(value) {
				deploymentRequest +='<tr><td>' + name + '</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>' + value + '</td></tr>';
			}
		}

		deploymentRequest = 'Deployment request for <strong>' + environment + '</strong> by <strong>' + requester + '</strong><br />' + 
							'<table><tr><tr><td><strong>Repo</strong></td><td>&nbsp;</td><td><strong>Branch</strong></td></tr></tr>' +
  							'<tbody>';

		addRow('SNapp', snapp);
		addRow('SNStaticPages', snstaticpages);
		addRow('TacoStand', tacostand);
		addRow('SQL', sql);
		addRow('SNSeats', snseats);
		addRow('SNSeats API', snseatsapi);
		addRow('SNappier', snappier);
		addRow('SNWebAPI', snwebapi);
		addRow('Tag', tag);

		deploymentRequest += '</tbody>' +
							 '</table>';

		var data = JSON.stringify({
    		color: 'green',
    		message: deploymentRequest,
    		notify: 'true',
    		message_format: 'html'
    	});

		robot.http('https://api.hipchat.com/v2/room/1325950/notification?auth_token=' + process.env.DEPLOY_HIPCHAT_API_KEY)
			.header('Content-Type', 'application/json')
			.post(data)(function(err, res, body) {
			});

			var html = fn({
				message: {
					success: 'Request successful!'
				}				
			});

			return res.send(html);

	});

	robot.hear(/what\'s on dev/i, function(msg){
		msg.send('Look for yourself https://deploy-tracker.cudasign.com/tracker/');
	});

	robot.hear(/deployment request url/i, function(msg){
		msg.send('You can make requests here: http://cudasign-cubot.herokuapp.com/hubot/deploy');
	});
}

// curl -X POST -H "Content-Type: application/json" -d '{"environment":"rc", "snapp":"master", "snstaticpages":"master", "tacostand":"master", "sql":"none"}' http://cudasign-cubot.herokuapp.com/hubot/requestdeploy
// curl -X POST -H "Content-Type: application/json" -d '{"environment":"qa", "snappier":"master", "snwebapi":"develop"}' http://cudasign-cubot.herokuapp.com/hubot/requestdeploy