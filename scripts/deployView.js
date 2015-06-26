module.exports = function(robot) {
	return robot.router.get('/hubot/deploy', function(req, res) {
		html = '<html><body><form action="/hubot/requestdeploy" method="post">' + 
				'<input type="text" name="snappier" placeholder="snappier branch"></input>' +
				'<button type="submit" value="submit">REQUEST!</button>' +
				'</form></body></html>';

		return res.send(html);

	});
}