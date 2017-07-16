
module.exports = {
  dumpError: function(msg, error, stdout, stderr) {
    msg.send(`error: ${error}`);
    msg.send(`stdout: ${stdout}`);
    msg.send(`stderr: ${stderr}`);
  }
}
