var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function(req, res) {
  burger.all(function(data) {
    var burgerObject = {
      burgers: data
    };
    console.log(burgerObject);
    res.render("index", burgerObject);
  });
});

router.get("/api/burgers", function(req, res) {
  burger.all(function(data) {
    res.json(data);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.create(["burger_name"], [req.body.burger_name], function(result) {
    res.redirect("/");
  });
});

router.post("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  burger.update({ eaten: true }, condition, function(result) {
    res.redirect("/");
  });
});
module.exports = router;
