// Description:
//   temperature
// Commands:
//   hubot temperature/temp - now temperature

const child_process = require('child_process');
const dumpError = require('../util').dumpError;

function discomfort_state(discomfort_index){
  if(discomfort_index <= 55){
    return '寒い';
  }else if(55 < discomfort_index && discomfort_index <= 60){
    return '肌寒い';
  }else if(60 < discomfort_index && discomfort_index <= 65){
    return '何も感じない';
  }else if(65 < discomfort_index && discomfort_index <= 70){
    return '快い';
  }else if(70 < discomfort_index && discomfort_index <= 75){
    return '暑くない';
  }else if(75 < discomfort_index && discomfort_index <= 80){
    return 'やや暑い';
  }else if(80 < discomfort_index && discomfort_index <= 85){
    return '暑くて汗がでる';
  }else if(85 < discomfort_index){
    return '暑くてたまらない';
  }
}

module.exports = (robot => {
  robot.respond(/(temperature)|(temp)/i, msg => {
    child_process.exec("sudo /opt/hubot-scripts/room_temp.py", (error, stdout, stderr) => {
      if(error){
        dumpError(msg, error, stdout, stderr);
        return;
      }

      let temperature = stdout.split("\n")[0].split("\t")[1];
      let humidity = stdout.split("\n")[1].split("\t")[1];
      let discomfort_index = stdout.split("\n")[2].split("\t")[1];
      msg.send(`temperature: ${temperature}, humidity: ${humidity}, discomfort_index: ${discomfort_index}, 要するに ${discomfort_state(discomfort_index)}`);
    });
  })
})
