import io from 'socket.io/client-dist/socket.io';

import Game from './Game.js';
import WaitingRoom from '../components/WaitingRoom.js'

const socket = io("http://localhost:3001");

const openConnection = () => {
    console.log("Connection made");
    return socket;
}

const emitData = (type, data) => {
    socket.emit(String(type), data);
}

// socket.on('idReturned', (data) => {
//     WaitingRoom.setIdReturned(data);
//     console.log('id returned', data);
//     WaitingRoom.increaseNumberReady();
// })

export {
    socket,
    openConnection,
    emitData,
}
