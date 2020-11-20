import * as three from 'three';

import { getCurrentState, playersById } from './state';
import { Player } from './player';

const aspect = window.innerWidth / window.innerHeight;
const scene = new three.Scene();
const camera = new three.PerspectiveCamera(75, aspect, 0.1, 1000);
const gl = new three.WebGLRenderer();

//const g = new three.PlaneBufferGeometry();
//const m = new three.MeshBasicMaterial({color: 0xffffff, side: three.DoubleSide});
//const q = new three.Mesh(g, m);
//scene.add(q);

camera.position.z = 5;

gl.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(gl.domElement);

export function makeSprite(color) {
    const geometry = new three.PlaneBufferGeometry();
    const material = new three.MeshBasicMaterial({color: color, side: three.DoubleSide});
    const quad = new three.Mesh(geometry, material);
    scene.add(quad);

    return quad;
}

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
		playersById[player.id] = new Player(player.x, player.y, color);
	    } else {
		playersById[player.id].sprite.position.set(player.x, player.y, 0);
	    }
	}
    }
    
    gl.render(scene, camera);
    requestAnimationFrame(render);
}

export function startRendering() {
    requestAnimationFrame(render);
}
