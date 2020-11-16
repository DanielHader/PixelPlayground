const three = require('three');
//import * as three from 'three';

class Renderer
{
    constructor()
    {
	aspect = window.innerWidth / window.innerHeight;
	
	this.scene = new three.Scene();
	this.camera = new three.PerspectiveCamera(75, aspect, 0.1, 1000);
	this.camera.position.z = 5;

	this.gl = new three.WebGLRenderer();
	this.gl.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(this.gl.domElement);

	this.sprites = [];
    }
    
    makeSprite()
    {
	const geometry = new three.PlaneBufferGeometry();
	const material = new three.MeshBasicMaterial({color:0x00ffff, side: three.DoubleSide});
	const quad = new three.Mesh(geometry, material);
	this.sprites.push(new three.Mesh);
	this.scene.add(quad);
	return quad;
    }

    render()
    {
	this.gl.render(this.scene, this.camera);
	requestAnimationFrame(()=>{this.render()});
    }
}

module.exports = Renderer;
