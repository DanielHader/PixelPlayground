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
	    const socket = this.sockets[playerId];
	    const player = this.players[playerId];

	    player.update(dt);

	    socket.emit(Constants.MSG_TYPES.GAME_UPDATE, player.serialize());
	});
    }
    
    addPlayer(socket, username) {
	this.sockets[socket.id] = socket;

	const x = Math.floor(Math.random() * 10);
	const y = Math.floor(Math.random() * 10);

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
