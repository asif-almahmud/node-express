const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

const PORT = process.env.PORT || 3500;

//-> There are three types off middlewares - built-in middlewares, custom middlewares and third party middlewares

//-> app.use()
//-> We often use app.use() to apply middlewares to all routes that are coming in, i.e. if a middleware using app.use() is written after a route but before all other routes then this middleware will not be applied for the first route but will be applied for all other routes. We can also use app.use() to prefix a route path and then pass a router object, and thus it will make our routes handling very easy.

//-> Example of custom middleware:
app.use(logger);

//-> Example of third party middleware:
app.use(cors(corsOptions)); // CORS stands for Cross Origin Resource Sharing

//-> Examples of built-in middlewares:
app.use(express.urlencoded({ extended: false })); // built-in middleware to handle urlencoded data, in other words to handle form data
app.use(express.json()); // express.json() is also a built-in middleware which parses incoming requests with JSON payloads and is based on body-parser
app.use(express.static(path.join(__dirname, "/public"))); // express.static() middleware is used to make the static files readily available for the coming routes. Static files are like - css files, images, texts. The default path prefix for this is "/". That means under the hood we are using - app.use("/", express.static(path.join(__dirname, "/public"))). So to make sure other routes that starts specificly with other things need to be passed as the first parameter
app.use("/subdir", express.static(path.join(__dirname, "/public")));
// note: built-in middlewares do not need next() call, it is already built into that

//-> Using the router object provided by express
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/employees", require("./routes/api/employees"));

//-> Chaining route handlers
const one = (req, res, next) => {
   console.log("one");
   next();
};

const two = (req, res, next) => {
   console.log("two");
   next();
};

const three = (req, res) => {
   console.log("three");
   res.send("Finished!");
};

app.get("/chain(.html)?", [one, two, three]); // When the route get hit the handlers start to run one after another. The convention is all the handlers before the last one are called middlewares and the last handler which terminates the process is called controller

//-> Catching all routes that are not handled before and responding with custom responses
app.all("*", (req, res) => {
   // app.all() will allow us to work with any method
   // app.all() allows us to use regex for routes
   // asteric says to allow everything after the slash
   // as express works like water fall, so the unhandled requests will come to this point eventually

   res.status(404); // we are manually sending the 404 status code otherwise express will send 200 ok as express is now able to catch any request that is not handled before

   if (req.accepts("html")) {
      res.sendFile(path.join(__dirname, "views", "404.html"));
   } else if (req.accepts("json")) {
      res.json({ error: "404 Not Found" });
   } else {
      res.type("txt").send("404 Not Found");
   }
});

//-> custom error handling (for example CORS error will be handed)
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
