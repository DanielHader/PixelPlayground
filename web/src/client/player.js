import { Sprite } from './sprite';
import { keys, lastDir, heldDirs } from './input';

const Constants = require('../shared/constants');

function interpolate(v1, v2, t)
{
    return v1 * (1 - t) + v2 * t;
}

export class Player
{
    constructor(x, y, sprite)
    {
	this.x = x;
	this.y = y;

	this.direction = Constants.UP;
	this.state = Constants.STOPPED;

	this.frameTimer = 0;
	
	this.sprite = sprite;
	this.sprite.setPosition(this.x, this.y, 0);
    }
}
