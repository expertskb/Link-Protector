const express = require('express');
const route = express.Router();
const IndexController = require('../controller/IndexController');
const ViewController = require('../controller/ViewController');
const view = require('../controller/ViewController');
const { text } = require('body-parser');

route.get('/', IndexController.getIndex);
route.post('/', IndexController.postIndex);

route.all("/:id([a-zA-Z0-9]{6})", ViewController.Index);

module.exports = route;
