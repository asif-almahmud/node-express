const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3500;

app.get("/", (req, res) => {
   //    res.sendFile("./views/index.html", { root: __dirname }); // this is one way of serving a file
   res.sendFile(path.join(__dirname, "views", "index.html")); // this is another way of serving a file
});

app.get("/new-page.html", (req, res) => {
   res.sendFile(path.join(__dirname, "views", "new-page.html")); // this is another way of serving a file
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
