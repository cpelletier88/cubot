module.exports = function (robot) {

  var util;
  util = require('util');

  robot.respond(/(\bhug\b|\bhugs\b)/i, function (msg) {

    msg.reply("(heart)");

  });

  robot.hear(/what time is it/i, function (msg) {

    var moment = require('moment');

    now = moment().subtract(7, 'hours');

    msg.send(now.format('MMMM Do YYYY, h:mm:ss a'));
  });

  robot.hear(/RIP cubot/i, function (msg) {
    msg.send('What is dead may never die');
    return setTimeout(function () {
      return msg.send('but rises again, harder and stronger');
    }, 1500);
  });

  robot.hear(/(smash)|(ⓢⓜⓐⓢⓗ)|sm\(ashto|(s|ⓢ)(m|ⓜ)(a|ⓐ|\(a)(s|ⓢ)(h|ⓗ)/i, function (msg) {
    if (msg.message.room === 'super_smash_brothers') {
      var moment = require('moment');
      var now = moment().subtract(8, 'hours')
      var hours = now.hours();
      var minutes = now.minutes();

      if (hours >= 17 || (hours >= 16 && minutes > 30)) {
        msg.send('I would love to play!');
      } else {
        msg.send('Shouldn\'t you be working? (areyoukiddingme)');
      }
    }

    return;
  });

  robot.hear(/thanks cubot/i, function (msg) {
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

  robot.respond(/debug (.*)/i, function (msg) {
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
      if (msg[arguments[0]]) {
        displayInfo(msg[arguments[0]]);
      } else {
        msg.send('That information was not found');
      }
    } else if (arguments.length === 2) {
      if (msg[arguments[0]] && msg[arguments[0]][arguments[1]]) {
        displayInfo(msg[arguments[0]][arguments[1]]);
      } else {
        msg.send('That information was not found');
      }
    } else if (arguments.length === 3) {
      if (msg[arguments[0]] && msg[arguments[0]][arguments[1]] && msg[arguments[0]][arguments[1]][arguments[2]]) {
        displayInfo(msg[arguments[0]][arguments[1]][arguments[2]]);
      } else {
        msg.send('That information was not found');
      }
    } else {
      msg.send('I don\'t understand');
    }

  });

  robot.hear(/notify robots (.*)/i, function (res) {

    var arguments = res.match[1].split('|');

    var data = JSON.stringify({
      color: arguments[0],
      message: arguments[1],
      notify: 'false',
      message_format: 'text'
    });

    robot.http('https://api.hipchat.com/v2/room/1610182/notification?auth_token=' + process.env.HIPCHAT_API_KEY)
      .header('Content-Type', 'application/json')
      .post(data)(function (err, res, body) {

    });

  });

  robot.hear(/notifyhtml robots (.*)/i, function (res) {

    var arguments = res.match[1].split('|');

    var data = JSON.stringify({
      color: arguments[0],
      message: arguments[1],
      notify: 'false',
      message_format: 'html'
    });

    robot.http('https://api.hipchat.com/v2/room/1610182/notification?auth_token=' + process.env.HIPCHAT_API_KEY)
      .header('Content-Type', 'application/json')
      .post(data)(function (err, res, body) {

    });

  });

  robot.hear(/\(fire\)/i, function (msg) {
    if (msg.message.room === 'super_smash_brothers' || msg.message.room === 'robots') {
      msg.send('(dealwithit)');
    }
  });

  robot.hear(/noooooo/i, function (msg) {
    msg.send('http://www.nooooooooooooooo.com/');
  });

}
