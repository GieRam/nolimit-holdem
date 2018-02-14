'use strict';

const validateBoard = R.curry((streetCards, board) => {
	if (board.length !== streetCards) {
		throw new Error("Street already dealt");
	}
});

const validatePreflop = validateBoard(0);
const validateFlop = validateBoard(3);
const validateTurn = validateBoard(4);

module.exports = {
	validateBoard,
	validatePreflop,
	validateFlop,
	validateTurn
};