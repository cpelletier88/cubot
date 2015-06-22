module.exports = function(robot) {

	var util;
	util = require('util');

    robot.respond(/(\bhug\b|\bhugs\b)/i, function(msg){

        msg.reply("(heart)");

    });

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


		if (passedDay.toLowerCase() === 'tomorrow') {
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
		} else if (passedDay) {
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

    robot.hear(/what time is it/i, function(msg){

    	var moment = require('moment');

    	now = moment().subtract(7, 'hours');

    	msg.send(now.format('MMMM Do YYYY, h:mm:ss a'));
    });

    robot.hear(/RIP cubot/i, function(msg){
    	msg.send('What is dead may never die');
    	return setTimeout(function() {
    		return msg.send('but rises again, harder and stronger');
    	}, 1500);
    });


    robot.hear(/smash?/i, function(msg){
    	if (msg.message.room === 'super_smash_brothers') {
    		var moment = require('moment');
    		var now = moment().subtract(7, 'hours')
    		var hours = now.hours();
    		var minutes = now.minutes();

    		if(hours > 17 || (hours >= 16 && minutes > 30)) {
    			msg.send('I would love to play!');
    		} else {
    			msg.send('Shouldn\'t you be working? (areyoukiddingme)')
    		}
    	}

    	return;
    });

    robot.hear(/thanks cubot/i, function(msg){
    	var thanks = [
    		'My duty is to serve you.',
    		'No problem! :)',
    		'You are welcome.',
    		'You should thanks @ChrisPelletier.',
    		'I am just following my programming.',
    		'Yup!',
    		'I am just doing my job.'
    	];

    	msg.send(msg.random(thanks));
    });

    robot.respond(/debug (.*)/i, function(msg){
    	var inspectStuff;
    	var arguments = msg.match[1].split('.');

    	function displayInfo(inspectStuff) {
    		if (inspectStuff) {
    			var inspectInfo = util.inspect(inspectStuff);

    			msg.send('info about response.' + msg.match[1]);
    			msg.send('/code ' + inspectInfo);
    		}
    	}

   		if (arguments.length === 1) {
   			if(msg[arguments[0]]) {
   				displayInfo(msg[arguments[0]]);
   			} else {
   				msg.send('That information was not found');
   			}
   		} else if (arguments.length === 2) {
			if(msg[arguments[0]] && msg[arguments[0]][arguments[1]]) {
				displayInfo(msg[arguments[0]][arguments[1]]);
			} else {
   				msg.send('That information was not found');
   			}
   		} else if (arguments.length === 3) {
			if(msg[arguments[0]] && msg[arguments[0]][arguments[1]]  && msg[arguments[0]][arguments[1]][arguments[2]]) {
				displayInfo(msg[arguments[0]][arguments[1]][arguments[2]]);
			} else {
   				msg.send('That information was not found');
   			}
   		} else {
   			msg.send('I don\'t understand');
   		}
    	
    });
}