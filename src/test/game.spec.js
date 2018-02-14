'use strict';

const { describe, it } = require("mocha");
const { expect } = require("chai");
const uuidv4 = require("uuidv4");

const Game = require("../main/domain/table");

const R = require("ramda");

describe('Game module', () => {

    function getHeadsUpTable() {
        return { 1: { id: uuidv4() }, 2: { id: uuidv4() }};
    }

    describe('seat player', () => {
        it('should seat player', () => {
            let players = {};
            players = Game.seatPlayer(players, { id: uuidv4() }, 1);
            expect(R.keys(players).length).to.eq(1);
            expect(players[1]['id'].length).to.eq("97ef5b6e-aeee-4932-9db9-3854d88e5105".length);
        });
        it('should allow 2 players', () => {
            let players = Game.seatPlayer({}, { id: uuidv4()}, 1);
            players = Game.seatPlayer(players, { id: uuidv4()}, 2);
            expect(Object.keys(players).length).to.eq(2);
        });
        it('should not allow seating player in filled seat', () => {
            let players = Game.seatPlayer({}, { id: uuidv4()}, 1);
            expect(() => Game.seatPlayer(players, { id: uuidv4() }, 1)).to.throw("Seat is taken");
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
            const deck = require("../main/domain/deck");
            players = Game.dealPreflop(players, deck);
            expect(deck.length).to.eq(48);
            expect(players[1].holdingCards.length).to.eq(2);
            expect(players[2].holdingCards.length).to.eq(2);
        });
        it('should deal different cards on consecutive tries', () => {
            // Can actually be deleted because there's a chance holding cards will be same minor % of the time.
            let playersFirst = getHeadsUpTable();
            let playersSecond = getHeadsUpTable();
            const deck = require("../main/domain/deck");
            playersFirst = Game.dealPreflop(playersFirst, Game.shuffleDeck(deck));
            playersSecond = Game.dealPreflop(playersSecond, Game.shuffleDeck(deck));

            expect(playersFirst["1"]["holdingCards"]).to.not.deep.equal(playersSecond["1"]["holdingCards"]);
            expect(playersFirst["2"]["holdingCards"]).to.not.deep.equal(playersSecond["2"]["holdingCards"]);
        });
    });
});