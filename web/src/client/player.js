import { makeSprite } from './render';
import { keys, lastDir, heldDirs } from './input';

const Constants = require('../shared/constants');

function interpolate(v1, v2, t)
{
    return v1 * (1 - t) + v2 * t;
}

export class Player
{
    constructor(x, y, color)
    {
	this.x = x;
	this.y = y;

	this.color = color;

	this.direction = Constants.UP;
	this.state = Constants.STOPPED;

	this.frameTimer = 0;
	
	this.sprite = makeSprite(color);
	this.sprite.position.set(this.x, this.y, 0);
    }
}
