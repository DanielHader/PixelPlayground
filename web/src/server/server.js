const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const socketio = require('socket.io');

const webpackConfig = require('../../webpack.config.js');

const app = express();
app.use(express.static('public'))

if (process.env.NODE_ENV === 'development')
{
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler));
}
else
{
    app.use(express.static('dist'));
}

const Constants = require('../shared/constants');
const Game = require('./game');

const port = process.env.PORT || 3000
const server = app.listen(port);
const io = socketio(server);

console.log(`server listening on port ${port}`);

game = new Game();

io.on('connection', socket => {
    console.log('player connected', socket.id);

    socket.on(Constants.MSG_TYPES.JOIN_GAME, joinGame);
    socket.on(Constants.MSG_TYPES.INPUT, handleInput);
    socket.on(Constants.MSG_TYPES.DISCONNECT, disconnect);
});

function joinGame(username)
{
    game.addPlayer(this, username);
}

function handleInput(input)
{
    game.handleInput(this, input);
}

function disconnect()
{

}
