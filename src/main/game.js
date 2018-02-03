"use strict";

const R = require("ramda");
const uuidv4 = require("uuidv4");

function seatPlayer(players, player, seat) {
    return R.assoc(seat, player, players);
}

function availableSeats(players) {
    const seats = ["1", "2"];
    const keys = R.keys(players);

    return R.without(keys, seats);
}

function removePlayer(players, seat) {
    return R.dissoc(seat, players);
}

function dealTable(players, deck) {
    return R.map((player) => {
        player = dealTwoCardsToPlayer(player, deck);
        deck.splice(0, 2);
        return player;
    }, players);
}

function dealTwoCardsToPlayer(player, deck) {
    return R.assoc("holdingCards", R.take(2, deck), player);
}

function shuffleDeck(deck) {
    deck = deck.slice();
    for (let i = deck.length - 1; i >= 0; i--) {

        const randomIndex = Math.floor(Math.random() * (i + 1));
        const itemAtIndex = deck[randomIndex];

        deck[randomIndex] = deck[i];
        deck[i] = itemAtIndex;
    }
    return deck;
}

module.exports = {
    seatPlayer,
    removePlayer,
    dealTable,
    dealTwoCardsToPlayer,
    shuffleDeck,
    availableSeats
};