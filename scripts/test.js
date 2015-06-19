module.exports = function(robot) {
    robot.respond(/(\bhug\b|\bhugs\b)/i, function(msg){

        msg.reply("(heart)");

    });

    robot.hear(/what is for lunch/i, function(msg){

    	var moment = require('moment');

		var lunchChoices = [
			'Greek',
			'Mexican',
			'BBQ',
			'Japanese',
			'Burgers',
			'Nothing',
			'Nothing',
			'Chinese',
			'Mexican',
			'Sandwiches',
			'Thai',
			'Pizza',
			'Nothing',
			'Nothing'
		];

		var now = moment().subtract(7, 'hours');
		var daysFromStartPoint = Math.abs(moment('June 8, 2015').diff(now, 'days'));
		daysFromStartPoint = daysFromStartPoint % lunchChoices.length;

        msg.send('Today lunch is ' + lunchChoices[daysFromStartPoint]);

    });

    robot.hear(/what time is it/i, function(msg){

    	var moment = require('moment');

    	now = moment().subtract(7, 'hours');

    	msg.send(now.format('MMMM Do YYYY, h:mm:ss a'));
    });

}