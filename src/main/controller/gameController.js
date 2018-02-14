'use strict';
const express = require("express");
const app = express();

app.get("/", function (req, res) {
	return res.send("Hello World");
});

module.exports = app;