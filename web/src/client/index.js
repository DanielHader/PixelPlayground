import { startRendering } from './render';
import { processUpdate } from './state';
import { startInput } from './input';
import { connect, joinGame } from './network';
import { downloadAssets, getShader } from './sprite';

import './css/main.css';

Promise.all([
    downloadAssets(),
    connect(processUpdate),
]).then(() => {
    joinGame('test');
    startInput();
    startRendering();
});


