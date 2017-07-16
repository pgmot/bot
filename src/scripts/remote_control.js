// Description:
//   remote control
// Commands:
//   hubot aircon on - aircon on (cold, 25C, power level 2)
//   hubot aircon off - aircon off

const child_process = require('child_process');
const dumpError = require('../util').dumpError;

module.exports = (robot => {
  robot.respond(/aircon on/i, msg => {
    child_process.exec("irsend SEND_ONCE aircon on", (error, stdout, stderr) => {
      if(error){
        dumpError(msg, error, stdout, stderr);
        return;
      }
      msg.send("irsend aircon on done");
    });
  });

  robot.respond(/aircon off/i, msg => {
    child_process.exec("irsend SEND_ONCE aircon off", (error, stdout, stderr) => {
      if(error){
        dumpError(msg, error, stdout, stderr);
        return;
      }
      msg.send("irsend aircon off done");
    });
  });
});
