const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3500;

app.get("/", (req, res) => {
   //    res.sendFile("./views/index.html", { root: __dirname }); // this is one way of serving a file
   res.sendFile(path.join(__dirname, "views", "index.html")); // this is another way of serving a file
});

app.get("/new-page(.html)?", (req, res) => {
   res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

//-> Redirecting to another page
app.get("/old-page(.html)?", (req, res) => {
   res.redirect(301, "/new-page.html");
});

//-> Catching all routes that are not handled before and responding with a custom 404 page
app.get("/*", (req, res) => {
   // asteric says to allow everything after the slash
   // as express works like water fall, so the unhandled requests will come to this point eventually
   res.status(404).sendFile(path.join(__dirname, "views", "404.html")); // we are manually sending the 404 status code otherwise express will send 200 ok as express is now able to catch any request that is not handled before
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
