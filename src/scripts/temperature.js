// Description:
//   temperature
// Commands:
//   hubot temperature/temp - now temperature

const child_process = require('child_process');
const dumpError = require('../util').dumpError;

module.exports = (robot => {
  robot.respond(/(temperature)|(temp)/i, msg => {
    child_process.exec("sudo /opt/hubot-scripts/room_temp.py", (error, stdout, stderr) => {
      if(error){
        dumpError(msg, error, stdout, stderr);
        return;
      }

      let temperature = stdout.split("\n")[0].split("\t")[1];
      let humidity = stdout.split("\n")[1].split("\t")[1];
      msg.send(`temperature: ${temperature}, humidity: ${humidity}`);
    });
  })
})
