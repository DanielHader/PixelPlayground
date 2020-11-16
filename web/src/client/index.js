const Renderer = require('./render');
const Input = require('./input');
const Player = require('./player');

import { connect, joinGame, handleInput } from './network';

import './css/main.css';

const renderer = new Renderer();
const input = new Input();
const player = new Player(2, 2, 0xffff00, renderer);

renderer.render();

connect();

setInterval(() => {
    handleInput(input.serialize());
}, 1000 / 60);

