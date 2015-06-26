module.exports = function(robot) {
	return robot.router.get('/hubot/deploy', function(req, res) {
		var template = require('node-template');

		var html = template.create('./views/deploy.tpl.html');

		return res.send(html);

	});
}