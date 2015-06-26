module.exports = function(robot) {
	return robot.router.get('/hubot/deploy', function(req, res) {
		var jade = require('jade');
		var fn = jade.compile('./views/deploy.tpl.jade');
		var html = fn();

		return res.send(html);

	});
}