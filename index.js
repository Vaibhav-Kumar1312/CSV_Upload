const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("./assets"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use("/", require("./routes"));
module.exports = app;
