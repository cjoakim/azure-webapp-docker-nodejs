// Chris Joakim, Microsoft, 2018/06/15

const express = require('express');
const router  = express.Router();
const request = require('request');
const events  = require('events');
const util    = require('util');

const build_timestamp_obj = require("../build_timestamp.json");

router.get('/', function(req, res) {
  var resp_obj = {};
  resp_obj['current_date'] = new Date().toString();
  res.render('index', resp_obj);
});

module.exports = router;
