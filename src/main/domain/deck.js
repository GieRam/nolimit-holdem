'use strict';

const clubs = ['2c', '3c', '4c', '5c', '6c', '7c', '8c', '9c', 'Tc', 'Jc', 'Qc', 'Kc', 'Ac'];
const hearts = ['2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', 'Th', 'Jh', 'Qh', 'Kh', 'Ah'];
const spades = ['2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', 'Ts', 'Js', 'Qs', 'Ks', 'As'];
const diamonds = ['2d', '3d', '4d', '5d', '6d', '7d', '8d', '9d', 'Td', 'Jd', 'Qd', 'Kd', 'Ad'];
const deck = clubs.concat(hearts).concat(spades).concat(diamonds);

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
	deck,
	shuffleDeck
};