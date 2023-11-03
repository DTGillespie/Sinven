const fs = require("fs");
const moment = require("moment");
const execSync = require("child_process").execSync;

let stream     = null;
let consoleOut = true;
let logLevel   = 5;        
let fileName   = "/app.log"; 
let path       = null;

module.exports = {

  init: function() {
    path = `${process.cwd()}${fileName}`;
    this.open();
  },
  
  open: function() {
    try {
      stream = fs.createWriteStream(path, {flags: 'a'})
    } catch (error) {
      console.log(error);
    };
  },

  write: function(data, level) {
    try {

      let levelSpecifier;
      let formatString = "%s\x1b[0m";
  
      switch (level) {

        case -1:
          levelSpecifier = "[General]";
          formatString = "\x1b[32m" + formatString;
        break;

        case 0:
          levelSpecifier = "[System]";
          formatString = "\x1b[33m" + formatString;
        break;

        case 1:
          levelSpecifier = "[General]";
        break;
  
        case 2:
          levelSpecifier = "[Warn]";
          formatString = "\x1b[33m" + formatString;
        break;
  
        case 3:
          levelSpecifier = "[Error]";
          formatString = "\x1b[31m" + formatString;
        break;
  
        case 4:
          levelSpecifier = "[Critical]";
          formatString = "\x1b[31m" + formatString;
        break;
  
        case 5:
          levelSpecifier = "[Debug]";
          formatString = "\x1b[34m" + formatString;
        break;
  
        default:
          levelSpecifier = "[Undefined]";
        break;
      };
  
      level == undefined || level == null ? level = 1 : null;

      if (level > logLevel) return;
  
      stream != null
        ? (() => {
  
          if (!fs.existsSync(path)) {
            execSync(`type nul > ${path}`);
            this.open();
          };
          
          stream.write(`${moment().format('YYYY-MM-DD hh:mm:ss')} ${levelSpecifier} ${data}\n\r`);

        })() : (() => {
          this.open();
          stream.write(`${moment().format('YYYY-MM-DD hh:mm:ss')} ${levelSpecifier} ${data}\n\r`);
        });
      
      if (consoleOut) {
        console.log(formatString, `\n${levelSpecifier} ${data}`);
      };

    } catch (error) {
      console.log(error);
    };
  },

  setLogLevel: function(level) {
    if (typeof(level) != "number") {
      this.write("Log Level Must Be A Valid Number", 4);
      return;
    };

    logLevel = level;
  },
};