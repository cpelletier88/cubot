var _ = require('lodash');

module.exports = function(robot) {
    robot.hear(/\(tableflip\)/i, function(res) {
    	res.reply("Please Respect Tables   ┬─┬ノ(ಠ_ಠノ)");
    });

    robot.respond(/you suck/i, function(res) {
    	res.reply("/code \n\n....................../´¯/)\n....................,/¯../\n.................../..../\n............./´¯¯¯/'...'/´¯¯¯/`\n........../'/.../..../....././¨¯\\\n........('(...´...´.... ¯~/'...')\n.........\\.................'...../\n..........\\.................../\n............\\..............(\n..............\\.............\\....");
    });
};