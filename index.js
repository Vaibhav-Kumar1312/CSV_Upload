const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./assets"));

app.set("view engine", "ejs");
app.set("views", "./views");

// app.use("/", (req, res) => {
//   return res.render("home", {
//     title: "Hello",
//   });
// });

app.use("/", require("./routes"));
module.exports = app;
