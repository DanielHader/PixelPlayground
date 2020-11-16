
const Constants = require('../shared/constants');

class Input {
    constructor() {
	this.keys = {
	    up:    false,
	    down:  false,
	    left:  false,
	    right: false,
	    run:   false
	};

	this.held_dirs = new Set();
	this.last_dir = Constants.UP;
	
	document.addEventListener('keydown', (e)=>{this.keydown(e)});
	document.addEventListener('keyup', (e)=>{this.keyup(e)});
    }

    serialize() {
	return `${this.keys.up},${this.keys.down},${this.keys.left},${this.keys.right}`;
    }
    
    keydown(e) {
	if (e.code === 'KeyW') {
	    this.keys.up = true;
	    this.held_dirs.add(Constants.UP);
	    this.last_dir = Constants.UP;
	}
	else if (e.code === 'KeyA') {
	    this.keys.up = true;
	    this.held_dirs.add(Constants.LEFT);
	    this.last_dir = Constants.LEFT;
	}
	else if (e.code === 'KeyS') {
	    this.keys.down = true;
	    this.held_dirs.add(Constants.DOWN);
	    this.last_dir = Constants.DOWN;
	}
	else if (e.code === 'KeyD') {
	    this.keys.right = true;
	    this.held_dirs.add(Constants.RIGHT);
	    this.last_dir = Constants.RIGHT;
	}
	else if (e.code === 'Space') {
	    this.keys.run = true;
	}
    }
    
    keyup(e) {
	if (e.code === 'KeyW') {
	    this.keys.up = false;
	    this.held_dirs.delete(Constants.UP);
	    if (this.last_dir === Constants.UP)
		this.last_dir = null;
	} else if (e.code === 'KeyA'){
	    this.keys.left = false;
	    this.held_dirs.delete(Constants.LEFT);
	    if (this.last_dir === Constants.LEFT)
		this.last_dir = null;
	} else if (e.code === 'KeyS') {
	    this.keys.down = false;
	    this.held_dirs.delete(Constants.DOWN);
	    if (this.last_dir === Constants.DOWN)
		this.last_dir = null;
	} else if (e.code === 'KeyD') {
	    this.keys.right = false;
	    this.held_dirs.delete(Constants.RIGHT);
	    if (this.last_dir === Constants.RIGHT)
		this.last_dir = null;
	} else if (e.code === 'Space') {
	    this.keys.run = false;
	}

	if (this.held_dirs.length > 0)
	    if (this.last_dir === null)
		this.last_dir = this.held_dirs.values().next().value;
    }
}

module.exports = Input;
