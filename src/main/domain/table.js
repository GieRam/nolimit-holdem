"use strict";

const R = require("ramda");
const uuidv4 = require("uuidv4");

function seatPlayer(players, player, seat) {
	if (R.isNil(players[seat])) {
		return R.assoc(seat, player, players);
	}
	throw new Error("Seat is taken");
}

function availableSeats(players) {
	const seats = ["1", "2"];
	const keys = R.keys(players);

	return R.without(keys, seats);
}

function removePlayer(players, seat) {
	return R.dissoc(seat, players);
}

module.exports = {
	seatPlayer,
	removePlayer,
	dealPreflop,
	dealTwoCardsToPlayer,
	availableSeats
};