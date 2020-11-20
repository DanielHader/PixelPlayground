const Constants = require('../shared/constants');
const Player = require('./player');

class Game {
    constructor() {
	this.sockets = {};
	this.players = {};
	this.lastUpdateTime = Date.now();
	this.shoudlSendUpdate = false;

	setInterval(() => {this.update()}, 1000 / 60);
    }

    update() {
	const now = Date.now();
	const dt = (now - this.lastUpdateTime) / 1000;
	this.lastUpdateTime = now;

	Object.keys(this.sockets).forEach(playerId => {
	    const player = this.players[playerId];

	    player.update(dt);
	});

	if (this.shouldSendUpdate) {
	    Object.keys(this.sockets).forEach(playerId => {
		const socket = this.sockets[playerId];
		const player = this.players[playerId];

		socket.emit(Constants.MSG_TYPES.GAME_UPDATE, this.serialize(player));
	    });
	    this.shouldSendUpdate = false;
	} else {
	    this.shouldSendUpdate = true;
	}
    }

    serialize(player) {
	const nearbyPlayers = Object.values(this.players);
	
	return {
	    t: Date.now(),
	    me: player.id,
	    players: nearbyPlayers.map(p => p.serialize()),
	};
    }
    
    addPlayer(socket, username) {
	this.sockets[socket.id] = socket;

	const x = Math.random() * 2 - 1;
	const y = Math.random() * 2 - 1;

	this.players[socket.id] = new Player(socket.id, username, x, y);
    }

    removePlayer(socket) {
	delete this.sockets[socket.id];
	delete this.players[socket.id];
    }

    handleInput(socket, input) {
	if (this.players[socket.id])
	    this.players[socket.id].handleInput(input);
    }
}

module.exports = Game;
