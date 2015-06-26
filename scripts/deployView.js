module.exports = function(robot) {
	return robot.router.get('/hubot/deploy', function(req, res) {
		html =  '<html><body>wat</body></html>';
		res.type('html');
		res.send(html);
	}
}