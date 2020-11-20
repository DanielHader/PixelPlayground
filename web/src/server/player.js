
const Constants = require('../shared/constants');
class Player {
    constructor(id, username, x, y) {
	this.id = id;
	this.username = username;

	this.x = Math.floor(x);
	this.y = Math.floor(y);

	this.nx = this.x;
	this.ny = this.y;
	
	this.fx = this.x;
	this.fy = this.y;
	
	this.direction = Constants.UP;

	this.state = Constants.STOPPED;
	this.frameTimer = 0;

	this.lastInput = null;
    }

    handleInput(input)
    {
	this.lastInput = input;
    }
    
    update(dt) {
	if (!this.lastInput)
	    return;

	if (this.state == Constants.STOPPED) {
	    if (this.lastInput.lastDir !== null) {
		this.direction = this.lastInput.lastDir;
		this.state = Constants.MOVING;
		this.frameTimer = 0;

		if (this.direction == Constants.UP)
		    this.ny = this.y + 1;
		else if (this.direction == Constants.DOWN)
		    this.ny = this.y - 1;
		else if (this.direction == Constants.LEFT)
		    this.nx = this.x - 1;
		else
		    this.nx = this.x + 1;
	    }
	}
	if (this.state == Constants.MOVING) {
	    if (this.frameTimer < 22) {
		this.frameTimer++;
		const ratio = this.frameTimer / 22;

		this.fx = this.x * (1 - ratio) + this.nx * ratio;
		this.fy = this.y * (1 - ratio) + this.ny * ratio;
	    } else {
		this.state = Constants.STOPPED;
		this.frameTimer = 0;
		this.x = this.nx;
		this.y = this.ny;
		this.fx = this.x;
		this.fy = this.y;
	    }
	}
    }

    serialize() {
	return {
	    id: this.id,
	    x: this.fx,
	    y: this.fy,
	};
    }
}

module.exports = Player;
