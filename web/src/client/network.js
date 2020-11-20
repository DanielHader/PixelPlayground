import io from 'socket.io-client';

const Constants = require('../shared/constants');

const socketProtocol = (window.location.protocol.includes('https')) ? 'wss' : 'ws';
const socket = io(`${socketProtocol}://${window.location.host}`, {reconnection: false});

const connectedPromise = new Promise(resolve => {
    socket.on('connect', () => {
	console.log('connected to server');
	resolve();
    });
});

export const connect = processUpdate => {
    connectedPromise.then(() => {
	socket.on(Constants.MSG_TYPES.GAME_UPDATE, processUpdate);
	socket.on(Constants.MSG_TYPES.DISCONNECT, () => {
	    console.log('disconnected from server')
	});
    });
};

export const joinGame = username => {
    socket.emit(Constants.MSG_TYPES.JOIN_GAME, username);
};

export const handleInput = input => {
    socket.emit(Constants.MSG_TYPES.INPUT, input);
};
