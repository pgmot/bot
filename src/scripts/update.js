// Description:
//   update
// Commands:
//   hubot update - update

const child_process = require('child_process');
const dumpError = require('../util').dumpError;

module.exports = (robot => {
  robot.respond(/update/i, msg => {
    msg.send('git pull...');
    child_process.exec("git pull origin master", (error, stdout, stderr) => {
      if(error){
        dumpError(msg, error, stdout, stderr);
        return;
      }
      msg.send('git pulled');
      msg.send(`
        \`\`\`
        ${stdout}
        \`\`\`
      `);

      msg.send('Good bye');
      setTimeout(() => process.exit(0), 5000);
    });
  });
});
