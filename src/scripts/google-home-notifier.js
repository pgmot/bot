// Description:
//   Google Home Notifier
// Commands:
//   hubot say こんにちは - say こんにちは from Google Home
const dumpError = require('../util').dumpError;
const googlehome = require('google-home-notifier');
googlehome.device('Google Home', 'ja-JP');

module.exports = (robot => {
  robot.respond(/say (.*)/i, (msg) => {
    const text = msg.match[1];
    if(text.match(/^[\x20-\x7e]*$/)){
      // 半角文字のみ
      googlehome.device('Google Home', 'en');
    }else{
      // アルファベット以外もある(日本語とか)
      googlehome.device('Google Home', 'ja-JP');
    }
    try {
      googlehome.notify(text, (res) => {
        msg.send(`say: ${text}`);
      });
    }catch(err){
      msg.send(`error: ${err}`);
    }
  });
});
