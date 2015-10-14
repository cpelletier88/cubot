var _ = require('lodash');

module.exports = function(robot) {
    robot.hear(/\(tableflip\)/i, function(res) {
    	res.reply("Please Respect Tables   ┬─┬ノ(ಠ_ಠノ)");
    });

    robot.hear(/jose/i, function (res) {
        res.send("(trolljose)");
    });

    robot.respond(/jose bomb( (\d+))?/i, function (msg) {
        var count = msg.match[2] || 5;
        for(var i = 0; i < count - 1; i++) {
            msg.send("(trolljose)");
        }
    });

    // robot.respond(/you suck/i, function(res) {
    // 	res.reply("\n\n....................../´¯/)\n....................,/¯../\n.................../..../\n............./´¯¯¯/'...'/´¯¯¯/`\n........../'/.../..../....././¨¯\\\n........('(...´...´.... ¯~/'...')\n.........\\.................'...../\n..........\\.................../\n............\\..............(\n..............\\.............\\....");
    // });
    
    
    var meanArray = [
    	'http://cdn.meme.am/instances/500x/53668178.jpg',
    	'http://cdn.meme.am/instances/400x/55364004.jpg',
    	'http://www.quickmeme.com/img/ab/abeee7d0019009857f3f87789e1913bad8da23b29881d920c5c8fc7038a75e7b.jpg',
    	'http://cdn.meme.am/instances/500x/52615916.jpg',
    	'http://i.qkme.me/3qf8sl.jpg',
    	'http://cdn.meme.am/instances/400x/54388732.jpg'

    ];

    robot.hear(/(you suck|you son of a bitch|damnit cubot|I hate you|(you are|you're) (the worst|terrible))/i, function(res) {
    	res.send(res.random(meanArray));
    });

    robot.hear(/testing 123/i, function(msg) {
        var roomId = msg.envelope.user.reply_to.split('_')[0];
        msg.send('/code ' + JSON.stringify(roomId));
    });
};