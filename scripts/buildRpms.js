// Description:
//   Build RPMs guy
//
// Commands:
//   hubot buildrpms <snappier-branch>,<snwebapi-branch>


var querystring = require('querystring');
var unirest = require('unirest');
var _ = require('lodash');
var Q = require('q');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

function makeRequest(jobName, queryParams) {
	var deferred = Q.defer();

	var endpoint = process.env.JENKINS_URL + '/view/WebAPI/job/' + jobName + '/buildWithParameters';

	unirest.post(endpoint)
		.auth({
			user: process.env.JENKINS_USERNAME,
			pass: process.env.JENKINS_API_KEY
		})
		.query(queryParams)
		.end(function (response) {
			deferred.resolve(response);
		});
	return deferred.promise;
}

function bundleRequests(requests) {
	var requestsToMake = [];

	_.each(requests, function(request) {
		requestsToMake.push(makeRequest(request.job, request.params));
	});

	return Q.all(requestsToMake);
}

module.exports = function(robot) {   
	robot.respond(/build-dev (.*)/i, function(res) {
		var branches = res.match[1];

		if (!branches || branches.trim().split(',').length < 2) {
			res.reply('Not enough parameters supplied.  Expecting snappierbranch,webapibranch');
    	} else {
       		var snappierBranch = branches.trim().split(',')[0].trim();
    		var webapiBranch = branches.trim().split(',')[1].trim();
	
			var requests = [
				{
					job: 'SignNow_SNAppier_Dev_Deploy',
					params: {
						branch: snappierBranch
					}
				},
				{
					job: 'SignNow_WebAPI_Dev_Deploy',
					params: {
						branch: webapiBranch
					}
				}
			];

			bundleRequests(requests).then(function(response) {
				res.send(JSON.stringify(response));
				res.send(process.env.JENKINS_USERNAME);
				res.send(process.env.JENKINS_API_KEY);
				res.send(process.env.JENKINS_URL);
				res.reply('Builds queued up!');
			});
    	}
	});

	robot.respond(/build-stage (.*)/i, function(res) {
		var branches = res.match[1];
		
		if (!branches || branches.trim().split(',').length < 2) {
			res.reply('Not enough parameters supplied.  Expecting snappierbranch,webapibranch');
    	} else {
    		var snappierBranch = branches.trim().split(',')[0].trim();
    		var webapiBranch = branches.trim().split(',')[1].trim();
			var requests = [
				{
					job: 'CudaSign_SNAppier_Stage_Deploy',
					params: {
						branch: snappierBranch
					}
				},
				{
					job: 'CudaSign_WebAPI_Stage_Deploy',
					params: {
						branch: webapiBranch
					}
				},
				{
					job: 'SignNow_SNAppier_Stage_Deploy',
					params: {
						branch: snappierBranch
					}
				},
				{
					job: 'SignNow_WebAPI_Stage_Deploy',
					params: {
						branch: webapiBranch
					}
				}
			];

			bundleRequests(requests).then(function() {
				res.reply('Builds queued up!');
			});
    	}
	});

	robot.respond(/build-rpms (.*)/i, function(res) {
		var branches = res.match[1];

		if (branches = undefined || !branches || branches.length < 2) {
			res.reply('Not enough parameters supplied.  Expecting snappierbranch,webapibranch');
    	} else {
    		var snappierBranch = branches.trim().split(',')[0].trim();
    		var webapiBranch = branches.trim().split(',')[1].trim();

			var requests = [
				{
					job: 'SNAppier_Builder_v2',
					params: {
						SNAppierBranch: snappierBranch,
						Build_Target_Env: 'qa'
					}
				},
				{
					job: 'SNAppier_Builder_v2',
					params: {
						SNAppierBranch: snappierBranch,
						Build_Target_Env: 'rc-sn'
					}
				},
				{
					job: 'WebAPI_Builder_v2',
					params: {
						WebApiBranch: snappierBranch
					}
				}
			];

			bundleRequests(requests).then(function() {
				res.reply('Builds queued up!');
			});
    	}
	});
};