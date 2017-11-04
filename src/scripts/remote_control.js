// Description:
//   remote control
// Commands:
//   hubot aircon on - aircon on (cold, 25C, power level 2)
//   hubot aircon off - aircon off
//   hubot hdmi no1 - switch no1 (Fire TV)
//   hubot hdmi no2 - switch no2 (switch)

const child_process = require('child_process');
const dumpError = require('../util').dumpError;

function sendIR(msg, device, command){
  child_process.exec(`irsend SEND_ONCE ${device} ${command}`, (error, stdout, stderr) => {
    if(error){
      dumpError(msg, error, stdout, stderr);
      return;
    }
    msg.send(`irsend ${device} ${command} done`);
  });
}

module.exports = (robot => {
  robot.respond(/aircon on/i, msg => {
    sendIR(msg, 'aircon', 'on');
  });

  robot.respond(/aircon off/i, msg => {
    sendIR(msg, 'aircon', 'off');
  });

  robot.respond(/hdmi no1/i, msg => {
    sendIR(msg, 'hdmi_sw', 'no1');
  })

  robot.respond(/hdmi no2/i, msg => {
    sendIR(msg, 'hdmi_sw', 'no2');
  })
});
