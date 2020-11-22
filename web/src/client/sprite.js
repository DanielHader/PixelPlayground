import $ from 'jquery';
import * as THREE from 'three';

const emptyTexture = new THREE.Texture();

const textures = {};
const shaders = {};
const sprites = {};
const sprite_data = {};

const SPRITE_DATA = {
    'link': 'link.json'
}

const SHADER_DATA = {
    'sprite': {
	vert_file: 'sprite.vert',
	frag_file: 'sprite.frag',
	uniforms: {
	    spritesheet: { value: emptyTexture },
	    srcPos: { value: new THREE.Vector2(0.0, 0.9) },
	    srcSize: { value: new THREE.Vector2(0.1, 0.1) },
	    dstPos: { value: new THREE.Vector2(0.1, 0.1) },
	    dstSize: { value: new THREE.Vector2(0.3, 0.3) }
	}
    }
}

const spritePromises = Object.keys(SPRITE_DATA).map(downloadSprite);
const shaderPromises = Object.keys(SHADER_DATA).map(downloadShader);

const downloadPromise = Promise.all(spritePromises.concat(shaderPromises));

function downloadSprite(name) {
    return new Promise(resolve => {
	const spriteFile = SPRITE_DATA[name];
	$.getJSON(`/assets/sprites/${spriteFile}`, data => {
	    resolve(data);
	});
    }).then(data => {
	if (!(data.spritesheet in textures)) {
	    const src = `/assets/spritesheets/${data.spritesheet}`;
	    const texture = new THREE.TextureLoader().load(src);
	    texture.magFilter = THREE.NearestFilter;
	    texture.minFilter = THREE.NearestFilter;
	    textures[data.spritesheet] = texture;
	}
	sprite_data[name] = data;
    });
}

function downloadShader(name) {
    return new Promise(resolve => {
	const shaderData = SHADER_DATA[name];
	
	const vertShaderPromise = new Promise(resolveVert => {
	    $.get(`/assets/shaders/${shaderData.vert_file}`, data => { resolveVert(data) });
	});

	const fragShaderPromise = new Promise(resolveFrag => {
	    $.get(`/assets/shaders/${shaderData.frag_file}`, data => { resolveFrag(data) });
	});

	Promise.all([vertShaderPromise, fragShaderPromise]).then((src) => {
	    const material = new THREE.ShaderMaterial({
		vertexShader: src[0],
		fragmentShader: src[1],
		uniforms: shaderData.uniforms,
		transparent: true,
	    });
	    shaders[name] = material;
	    resolve();
	});
    });
}

export const downloadAssets = () => downloadPromise;

export class Sprite {
    constructor(name) {
	const data = sprite_data[name];
	
	this.spritesheet = data.spritesheet;
	this.texture = textures[this.spritesheet];
	
	this.frames = data.frames;
	this.animations = data.animations;

	const geometry = new THREE.PlaneBufferGeometry();
	const material = shaders['sprite'];
	
	this.mesh = new THREE.Mesh(geometry, material);
	this.mesh.onBeforeRender = (renderer, scene, camera, geometry, material, group) => {
	    
	    material.uniforms.spritesheet.value = this.texture;
	};
    }

    update() {
	
    }

    setPosition(x, y, z) {
	this.mesh.position.set(x, y, z);
    }
    
    addToScene(scene) {
	scene.add(this.mesh);
    }
}
