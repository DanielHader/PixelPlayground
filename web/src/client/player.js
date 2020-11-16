const Renderer = require('./render');
const Constants = require('../shared/constants');

function interpolate(v1, v2, t)
{
    return v1 * (1 - t) + v2 * t;
}

class Player
{
    constructor(x, y, color, renderer)
    {
	this.x = x;
	this.y = y;

	this.color = color;
	this.renderer = renderer;

	this.direction = Constants.UP;
	this.state = Constants.STOPPED;

	this.frame_timer = 0;

	this.sprite = this.renderer.makeSprite();
	this.sprite.position.set(this.x, this.y, 0);
    }

    serialize()
    {
	return `${this.x},${this.y},${this.direction}`;
    }

    deserialize(message)
    {
	data = message.split(',');
	this.x = parseInt(data[0])
	this.y = parseInt(data[1])
	this.direction = parseInt(data[2])

	this.sprite.position.set(this.x, this.y, 0);
    }
}

module.exports = Player;
