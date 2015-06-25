var querystring = require('querystring');

module.exports = function(robot) {
// https://api.hipchat.com/v2/room/1610182/notification?auth_token=process.env.HIPCHAT_API_KEY

	robot.hear(/test/i, function(res){

		res.send('lunch!');

		var data = JSON.stringify({
    		color: 'green',
    		message: 'test',
    		notify: 'false',
    		message_format: 'text'
    	});

		robot.http('https://api.hipchat.com/v2/room/test_room/notification?auth_token=' + process.env.HIPCHAT_API_KEY)
			.header('Content-Type', 'application/json')
			.post(data)(function(err, res, body) {

			});


    	
	});


		robot.hear(/test2/i, function(msg){

			msg.send('lunch!');

			util = require('util');
			var data = JSON.stringify({
	    		
	    	});

			robot.http('https://api.hipchat.com/v2/room/?auth_token=' + process.env.HIPCHAT_API_KEY)
				.header('Content-Type', 'application/json')
				.get(data)(function(err, res, body) {
					msg.send(util.inspect(res));
				});


	    	
		});

}