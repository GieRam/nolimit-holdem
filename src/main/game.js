"use strict";

function addPlayer(players) {
    players.push({});
}

function removePlayer(players) {
    players.pop();
}

function deal(players) {
    players.forEach((it) => {
       it.cards = [ 1, 2 ];
    });
}

module.exports = {
    addPlayer,
    removePlayer,
    deal
};