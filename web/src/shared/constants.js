
module.exports = Object.freeze({
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,
    
    STOPPED: 0,
    WALKING: 1,
    RUNNING: 2,
    TURNING: 3,

    MSG_TYPES: {
	JOIN_GAME: "join_game",
	GAME_UPDATE: "game_update",
	DISCONNECT: "disconnect",
	INPUT: "input"
    },
    
    PLAYER_ANIMATION_FRAMES: [0, 20, 10, 6]
});
