module.exports = function(robot) {
	return robot.router.get('/hubot/deploy', function(req, res) {
		var html =  '<html><body>wat</body></html>';
		res.type('html');
		return res.send(html);
	}
}