import { startRendering } from './render';
import { processUpdate } from './state';
import { startInput } from './input';
import { connect, joinGame } from './network';

import './css/main.css';

startInput();
startRendering();

connect(processUpdate);
joinGame('test');

