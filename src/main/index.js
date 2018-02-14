'use strict';

const express = require("express");

const app = express();
const gameController = require("./controller/gameController");

app.use("/api", gameController);

app.listen(3000, (err) => {
	if (err) {
		console.log("Failed to start: " + err);
	}
	console.log("Listening on port 3000");
});