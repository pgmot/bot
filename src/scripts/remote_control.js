// Description:
//   remote control
// Commands:
//   hubot aircon on - aircon on (cold, 25C, power level 2)
//   hubot aircon off - aircon off
//   hubot hdmi no1 - switch no1 (Fire TV)
//   hubot hdmi no2 - switch no2 (switch)
//   hubot hdmi no3 - switch no3 (instead of turn off)
//   hubot tv on - on firetv and switch no1
//   hubot game on - off firetv and switch no2
//   hubot tv off - offf firetv and switch no3

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

const DEVICE_ID = 'living';
function runFireTVAction(action){
  child_process.exec(`curl localhost:5556/devices/action/${DEVICE_ID}/${action}`, (error, stdout, stderr) => {
    if(error){
      dumpError(msg, error, stdout, stderr);
      return;
    }

    msg.send(`${action} done`);
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

  robot.respond(/hdmi no3/i, msg => {
    sendIR(msg, 'hdmi_sw', 'no3');
  })

  robot.respond(/tv on/i, msg => {
    sendIR(msg, 'hdmi_sw', 'no1');
    runFireTVAction('turn_on');
  })
  robot.respond(/game on/i, msg => {
    sendIR(msg, 'hdmi_sw', 'no2');
    runFireTVAction('turn_off');
  });

  robot.respond(/tv off/i, msg => {
    sendIR(msg, 'hdmi_sw', 'no3');
    runFireTVAction('turn_off');
  })
});
