const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/", (req, res) => {
  return res.render("home", {
    title: "Hello",
  });
});

module.exports = app;
