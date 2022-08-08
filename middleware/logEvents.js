const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logName) => {
   const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
   const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

   try {
      if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
         await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
      }

      await fsPromises.appendFile(
         path.join(__dirname, "..", "logs", logName),
         logItem
      );
   } catch (err) {
      console.log(err);
   }
};

const logger = (req, res, next) => {
   logEvents(
      `requested method: ${req.method}\trequested from where: ${req.headers.origin}\trquested url: ${req.url}`,
      "reqLog.txt"
   );
   console.log(`requested method: ${req.method}, requested path: ${req.path}`);
   next();
};

module.exports = { logEvents, logger };
