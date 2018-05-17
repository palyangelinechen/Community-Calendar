const express = require("express");
const hbs = require("hbs");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const eventsRoute = require("./routes/eventsRoute.js");
const app = express();
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.static(path.join(__dirname, "../public")));
hbs.registerPartials(path.join(__dirname, "../views", "partials"));
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/CommunityCalendar");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.get("/", (req, res) => {
  res.redirect("/events");
})
app.use("/events", eventsRoute);
app.listen(process.env.PORT || 3000);
