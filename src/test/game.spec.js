'use strict';

const { describe, it } = require("mocha");
const { expect } = require("chai");
const uuidv4 = require("uuidv4");

const Game = require("../main/game");

const R = require("ramda");

describe('Game module', () => {

    function getHeadsUpTable() {
        return { 1: { id: uuidv4() }, 2: { id: uuidv4() }};
    }

    describe('add player', () => {
        it('should add player', () => {
            let players = {};
            players = Game.addPlayer(players, { id: uuidv4()});
            expect(R.keys(players).length).to.eq(1);
            expect(R.keys(players)[0].length).to.eq("97ef5b6e-aeee-4932-9db9-3854d88e5105".length);
        });
        it('should allow 2 players', () => {
            let players = Game.addPlayer({}, { id: uuidv4()});
            players = Game.addPlayer(players, { id: uuidv4()});
            expect(Object.keys(players).length).to.eq(2);
        });
    });
    describe('availableSeats', () => {
        it('should return two seats for empty players table', () => {
            const players = {};
            const seats = Game.availableSeats(players);
            expect(seats).to.deep.equal(["1","2"]);
        });
        it('should return one seat for table with one player at position 1', () => {
            const players = { 1: { id: uuidv4() }};
            const seats = Game.availableSeats(players);
            expect(seats).to.deep.equal(["2"]);
        });
        it('should return one seat for table with one player at position 2', () => {
            const players = { 2: { id: uuidv4() }};
            const seats = Game.availableSeats(players);
            expect(seats).to.deep.equal(["1"]);
        });
        it('should return no seats for table with 2 seated players', () => {
            const players = getHeadsUpTable();
            const seats = Game.availableSeats(players);
            expect(seats).to.deep.equal([]);
        });
    });
    describe('remove player', () => {
        it('should remove player from seat 1', () => {
            let players = getHeadsUpTable();
            players = Game.removePlayer(players, 1);
            expect(R.keys(players).length).to.eq(1);
            expect(players["2"]).not.be.null;
        });
        it('should remove player from seat 2', () => {
            let players = getHeadsUpTable();
            players = Game.removePlayer(players, 2);
            expect(R.keys(players).length).to.eq(1);
            expect(players["1"]).not.be.null
        });
    });
    describe('deal', () => {
        it('should give each player 2 cards from deck', () => {
            let players = getHeadsUpTable();
            const deck = require("../main/deck");
            players = Game.dealTable(players, deck);
            expect(deck.length).to.eq(48);
            expect(players[1].holdingCards.length).to.eq(2);
            expect(players[2].holdingCards.length).to.eq(2);
        });
        // TODO: Refactor players to be an array.. now its an object with integer indexes which is an array normally.
        it('should deal different cards on consecutive tries', () => {
            let playersFirst = getHeadsUpTable();
            let playersSecond = getHeadsUpTable();
            const deck = require("../main/deck");
            playersFirst = Game.dealTable(playersFirst, Game.shuffleDeck(deck));
            playersSecond = Game.dealTable(playersSecond, Game.shuffleDeck(deck));

            // TODO: Assert holdingCards are not identical.
        });

        function inArray(subArray, array) {
            return subArray.filter((it) => {
                return R.contains(it, array);
            }).length === subArray.length;
        }
    });
});