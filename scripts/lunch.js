module.exports = function(robot) {
	    robot.hear(/what is for lunch (.*)/i, function(msg){

	    	var passedDay = msg.match[1];

	    	if(passedDay) {
	    		passedDay = passedDay.replace(/[\.,-\/#!$%@\^&\*;:{}=\-_`~()\?]/g,'').replace('on ', '');;
	    	}

	    	var moment = require('moment');
	    	var _ = require('lodash');

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

			var dayNames = [
				'sunday',
				'monday',
				'tuesday',
				'wednesday',
				'thursday',
				'friday',
				'saturday'
			];

			var now = moment().subtract(7, 'hours');


			if (passedDay && passedDay.toLowerCase() === 'tomorrow') {
				now.add(1, 'day'); 		
			}

			if (passedDay && _.indexOf(dayNames, passedDay.toLowerCase()) !== -1) {

				if(passedDay.toLowerCase() === 'sunday' || passedDay.toLowerCase() === 'saturday') {
					msg.send('It\'s the weekend!  Eat whatever you want! (lol)');
					return;
				}

				var today = moment().day();
				var passedDayValue = _.indexOf(dayNames, passedDay.toLowerCase());

				if(today < passedDayValue) {
					now.add(passedDayValue - today, 'day');
				} else if (today > passedDayValue) {
					var daysToOffset = 7 - today + passedDayValue;

					now.add(daysToOffset, 'day');
				}
			} else if (passedDay && passedDay !== 'today' && passedDay !== 'tomorrow') {
				msg.send('I don\'t understand what ' + passedDay + ' is.');
				return;
			}

			var daysFromStartPoint = Math.abs(moment('June 8, 2015').diff(now, 'days'));
			daysFromStartPoint = daysFromStartPoint % lunchChoices.length;

	        if(!passedDay) {
	        	msg.send('Today lunch is ' + lunchChoices[daysFromStartPoint]);
	        } else if (passedDay.toLowerCase() === 'tomorrow') {
	        	msg.send(passedDay + ' lunch will be ' + lunchChoices[daysFromStartPoint]);
	        } else {
	        	msg.send('Lunch will be ' + lunchChoices[daysFromStartPoint] + ' on ' + passedDay);
	        }

	    });
}