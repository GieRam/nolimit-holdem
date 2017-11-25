"use strict";

const { describe, it } = require("mocha");
const { expect } = require("chai");

const Game = require("../main/game");

describe('Game module', () => {
    describe('add player', () => {
        it('should add player', () => {
            let players = [];
            Game.addPlayer(players);
            expect(players.length).to.eq(1);
        });
        it('should allow 2 players', () => {
            let players = [];
            Game.addPlayer(players);
            Game.addPlayer(players);
            expect(players.length).to.eq(2);
        })
    });
    describe('remove player', () => {
        it('should remove player', () => {
            let players = [{}, {}];
            Game.removePlayer(players);
            expect(players.length).to.eq(1);
        })
    });
    describe('deal', () => {
        it('should give each player 2 cards', () => {
            let players = [{}, {}];
            Game.deal(players);
            expect(players[0].cards.length).to.eq(2);
            expect(players[1].cards.length).to.eq(2);
        });
    });
});