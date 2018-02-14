'use strict';

function dealPreflop(players, deck) {
	return R.map((player) => {
		player = dealTwoCardsToPlayer(player, deck);
		// TODO: figure out what to do with deck mutations. Table object holding everything and passed around?
		deck.splice(0, 2);
		return player;
	}, players);
}

const dealPostFlop = R.curry((numberOfCards, table, deck) => {
	table = R.assoc("board", R.append(R.take(numberOfCards, deck), table["board"]));
	deck.splice(0, numberOfCards);
	return table;
});

const dealFlop = dealPostFlop(3);
const dealTurnRiver = dealPostFlop(1);

function dealTwoCardsToPlayer(player, deck) {
	return R.assoc("holdingCards", R.take(2, deck), player);
}

module.exports = {
	dealPreflop,
	dealTwoCardsToPlayer,
	dealPostFlop,
	dealFlop,
	dealTurnRiver
};