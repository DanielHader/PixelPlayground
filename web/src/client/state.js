import { Player } from './player';

const RENDER_DELAY = 50;

export const playersById = {};

const updates = [];
let firstServerTimestamp = 0;
let startTimestamp = 0;
    
export function processUpdate(update) {
    if (!firstServerTimestamp) {
	firstServerTimestamp = update.t;
	startTimestamp = Date.now();
    }
    updates.push(update);

    const base = getBaseUpdate();
    if (base > 0) {
	updates.splice(0, base);
    }
}

function currentServerTime() {
    return firstServerTimestamp - startTimestamp + Date.now() - RENDER_DELAY;
}
    
function getBaseUpdate() {
    const serverTime = currentServerTime();
    for (let i = updates.length - 1; i >= 0; i--) {
	if (updates[i].t <= serverTime) {
	    return i;
	}
    }
    return -1;
}

export function getCurrentState() {
    if (!firstServerTimestamp) {
	return null;
    }
    const base = getBaseUpdate();
    const serverTime = currentServerTime();

    if (base < 0 || base === updates.length - 1) {
	return updates[updates.length - 1];
    } else {
	const baseUpdate = updates[base];
	const next = updates[base + 1];
	const ratio = (serverTime - baseUpdate.t) / (next.t - baseUpdate.t);

	return {
	    me: next.me,
	    players: interpolateObjectArray(baseUpdate.players, next.players, ratio),
	};
    }
}

function interpolateObject(object1, object2, ratio) {
    if (!object2) {
	return object1;
    }

    const interpolated = {};
    Object.keys(object1).forEach(key => {
	if (key === 'id')
	    interpolated[key] = object1[key];
	else
	    interpolated[key] = object1[key] + (object2[key] - object1[key]) * ratio;
    });
    return interpolated;
}

function interpolateObjectArray(objects1, objects2, ratio) {
    return objects1.map(o => interpolateObject(o, objects2.find(o2 => o.id === o2.id), ratio));
}

