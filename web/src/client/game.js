
const Player = require('./player');

class Game {
    constructor(renderer) {
	this.player = new Player(0, 0, 0xffffff, renderer);
	this.otherPlayers = []
    }

    update() {
	
    }
}

module.exports = Game;
