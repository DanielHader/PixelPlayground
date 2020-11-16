
const Constants = require('../shared/constants');
class Player {
    constructor(id, username, x, y) {
	this.id = id;
	this.username = username;

	this.x = x;
	this.y = y;

	this.vx;
	this.vy
    }

    handleInput(input)
    {
	if (input[Constants.UP])
	    this.vy = 1;
	else if (inputs[Constants.DOWN])
	    this.vy = -1;
	else if (inputs[Constants.LEFT])
	    this.vx = -1;
	else if (inputs[Constants.RIGHT])
	    this.vx = 1;
    }
    
    update(dt) {
	this.x += this.vx * dt;
	this.y += this.vy * dt;
    }

    serialize() {
	return `${this.x},${this.y}`;
    }
}

module.exports = Player;
