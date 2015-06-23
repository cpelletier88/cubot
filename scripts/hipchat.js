// var querystring = require('querystring');

// module.exports = function(robot) {
// // https://api.hipchat.com/v2/room/1610182/notification?auth_token=process.env.HIPCHAT_API_KEY

// 	robot.hear(/lunch is here/i, function(res){

// 		res.send('lunch!');

// 		var data = JSON.stringify({
//     		color: 'green',
//     		message: 'Lunch is here! (yey)',
//     		notify: 'false',
//     		message_format: 'text'
//     	});

// 		robot.http('https://api.hipchat.com/v2/room/1610182/notification?auth_token=' + process.env.HIPCHAT_API_KEY)
// 			.header('Content-Type', 'application/json')
// 			.post(data)(function(err, res, body) {

// 			});


    	
// 	});

// }