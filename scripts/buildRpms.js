// Description:
//   Build RPMs guy
//
// Commands:
//   hubot buildrpms <snappier-branch>,<snwebapi-branch>


var querystring = require('querystring');
var unirest = require('unirest');
var _ = require('lodash');

module.exports = function(robot) {   
	robot.respond(/buildrpms (.*)/i, function(res) {
		var branches = res.match[1].trim().split(',');
		var snappierBranch = branches[0].trim();
		var webapiBranch = branches[0].trim();

    	if (!snappierBranch|| !webapiBranch) {
    		res.reply('You did not provide both branches.');
    	} else {
			var endpoint;
			
			endpoint = process.env.JENKINS_URL;

			var webapi = '/view/WebAPI/job/WebAPI_Builder_v2/buildWithParameters?WebApiBranch=' + webapiBranch;
			var snappier1 = '/view/WebAPI/job/SNAppier_Builder_v2/buildWithParameters?Build_Target_Env=qa&SNAppierBranch=' + snappierBranch;
			var snappier2 = '/view/WebAPI/job/SNAppier_Builder_v2/buildWithParameters?Build_Target_Env=rc-sn&SNAppierBranch=' + snappierBranch;
			

			unirest.post(endpoint + webapi)
					.header('Authorization', 'Basic ' + process.env.JENKINS_API_KEY)
					.send()
					.end(function(response) {
						unirest.post(endpoint + snappier1)
								.header('Authorization', 'Basic ' + process.env.JENKINS_API_KEY)
								.send()
								.end(function(response) {
									unirest.post(endpoint + snappier2)
											.header('Authorization', 'Basic ' + process.env.JENKINS_API_KEY)
											.send()
											.end(function(response) {
												res.reply('done');
											});
								});
					});
    	}
	});
};