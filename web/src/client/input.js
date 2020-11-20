
import { handleInput } from './network';

const Constants = require('../shared/constants');

export const keys = {
    up:    false,
    down:  false,
    left:  false,
    right: false,
    run:   false
};

export const heldDirs = new Set();
export let lastDir = null;
	
document.addEventListener('keydown', (e)=>{keydown(e)});
document.addEventListener('keyup', (e)=>{keyup(e)});

export function startInput() {
    setInterval(()=>{handleInput(serializeInput())}, 1000/60);
}

function serializeInput() {
    return {
	keys: keys,
	lastDir: lastDir,
	heldDirs: heldDirs,
    }
}
    
function keydown(e) {
    if (e.code === 'KeyW') {
	keys.up = true;
	heldDirs.add(Constants.UP);
	lastDir = Constants.UP;
    }
    else if (e.code === 'KeyA') {
	keys.left = true;
	heldDirs.add(Constants.LEFT);
	lastDir = Constants.LEFT;
    }
    else if (e.code === 'KeyS') {
	keys.down = true;
	heldDirs.add(Constants.DOWN);
	lastDir = Constants.DOWN;
    }
    else if (e.code === 'KeyD') {
	keys.right = true;
	heldDirs.add(Constants.RIGHT);
	lastDir = Constants.RIGHT;
    }
    else if (e.code === 'Space') {
	keys.run = true;
    }
}

function keyup(e) {
    if (e.code === 'KeyW') {
	keys.up = false;
	heldDirs.delete(Constants.UP);
	if (lastDir === Constants.UP)
	    lastDir = null;
    } else if (e.code === 'KeyA'){
	keys.left = false;
	heldDirs.delete(Constants.LEFT);
	if (lastDir === Constants.LEFT)
	    lastDir = null;
    } else if (e.code === 'KeyS') {
	keys.down = false;
	heldDirs.delete(Constants.DOWN);
	if (lastDir === Constants.DOWN)
	    lastDir = null;
    } else if (e.code === 'KeyD') {
	keys.right = false;
	heldDirs.delete(Constants.RIGHT);
	if (lastDir === Constants.RIGHT)
	    lastDir = null;
    } else if (e.code === 'Space') {
	keys.run = false;
    }

    if (heldDirs.length > 0)
	if (lastDir === null)
	    lastDir = heldDirs.values().next().value;
}

