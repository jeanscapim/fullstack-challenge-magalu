var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var cors = require("cors");

module.exports = function(){
  var app = express();
  /* Injeção de dependencia do bodyParser */
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  /* Injeção de dependencia do cors */
  app.use(cors());
  /* Injeção de dependencia do expressValidator */
  app.use(expressValidator());

  consign()
   .include('controllers')
   .then('provider')
   .into(app);

  return app;
}