module.exports = function(robot) {
	return robot.router.get('/hubot/deploy', function(req, res) {
		html = '<html><body>wat</body></html>';

		return res.send(html);

	});
}

// curl -X POST -H "Content-Type: application/json" -d '{"environment":"rc", "snapp":"master", "snstaticpages":"master", "tacostand":"master", "sql":"none"}' http://cudasign-cubot.herokuapp.com/hubot/requestdeploy
// curl -X POST -H "Content-Type: application/json" -d '{"environment":"qa", "snappier":"master", "snwebapi":"develop"}' http://cudasign-cubot.herokuapp.com/hubot/requestdeploy