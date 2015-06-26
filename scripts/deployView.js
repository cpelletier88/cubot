module.exports = function(robot) {
	return robot.router.post('/hubot/deploy', function(req, res) {
		return '<html><body>wat</body></html>';
	}
}