const express = require("express");
const _ = require("lodash");
const eventsRoute = express.Router();
const {Event} = require("../models/event.js");
eventsRoute.get("/", (req, res) => {
  Event.find()
  .then(events => {
    res.render("index.hbs", {
      events
    });
  })
  .catch(e => {
    res.status(404).send(e);
  })
})
eventsRoute.get("/new", (req, res) => {
  res.render("new.hbs");
})
eventsRoute.post("/", (req, res) => {
  const event = new Event({
    title: req.body.title,
    description: req.body.description
  })
  event.save()
  .then(event => {
    res.redirect("/");
  })
  .catch(e => {
    res.status(404).send(e);
  })
})
eventsRoute.get("/:id", (req, res) => {
  Event.find({_id: req.params.id})
  .then(event => {
    res.render("show.hbs", {
      id: event[0]._id,
      title: event[0].title,
      description: event[0].description
    });
  })
  .catch(e => {
    res.status(404).send(e);
  })
})
eventsRoute.get("/:id/edit", (req, res) => {
  Event.find({_id: req.params.id})
  .then(event => {
    res.render("edit.hbs", {
      id: event[0]._id,
      title: event[0].title,
      description: event[0].description
    });
  })
  .catch(e => {
    res.status(404).send(e);
  })
})
eventsRoute.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ["title", "description"]);
  Event.findByIdAndUpdate(id, {$set: body}, {new: true})
  .then(event => {
    res.redirect("/");
  })
  .catch(e => {
    res.status(404).send(e);
  })
})
eventsRoute.delete("/:id", (req, res) => {
  const id = req.params.id;
  Event.findByIdAndRemove(id)
  .then(event => {
    res.redirect("/");
  })
  .catch(e => {
    res.status(404).send(e);
  })
})
module.exports = eventsRoute
