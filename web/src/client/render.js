import * as three from 'three';

import { getShader, getTexture, Sprite } from './sprite';
import { getCurrentState, playersById } from './state';
import { Player } from './player';

const aspect = window.innerWidth / window.innerHeight;
const scene = new three.Scene();
const camera = new three.PerspectiveCamera(75, aspect, 0.1, 1000);
const gl = new three.WebGLRenderer();

camera.position.z = 2;

gl.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(gl.domElement);

function render() {
    const state = getCurrentState();
    if (state) {
	for (var i = 0; i < state.players.length; i++) {
	    const player = state.players[i];
	    if (!playersById[player.id]) {
		let color = 0x00ff00;
		if (player.id == state.me) {
		    color = 0x00ffff;
		}
		
		const sprite = new Sprite('link');
		sprite.addToScene(scene);
		playersById[player.id] = new Player(0, 0, sprite);
	    } else {
		playersById[player.id].sprite.setPosition(0, 0, 0);
	    }
	}
    }
    
    gl.render(scene, camera);
    requestAnimationFrame(render);
}

export function startRendering() {
    requestAnimationFrame(render);
}
