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
   res.redirect(301, "/new-page.html"); // 302 is the default status code express will send, but to make it clear to the search engines we will set the status code as 301 so that the search engines might understand this redirecting is permenant, we don't have the content for "/old-page.html" route any more
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
