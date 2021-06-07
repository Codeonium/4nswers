import io from 'socket.io/client-dist/socket.io';
import {useState, useEffect} from 'react';
import { Redirect } from 'react-router';

import {openConnection, emitData} from '../containers/SocketController.js';

// const socket = io("http://localhost:3001");
const socket = openConnection();

const WaitingRoom = () => {

    const [playerName, setPlayerName] = useState("");
    const [playerCreated, setPlayerCreated] = useState(false);
    const [playerReady, setPlayerReady] = useState(false);
    const [numberReady, setNumberReady] = useState(0);
    const [everyoneReady, setEveryoneReady] = useState(false);
    const [connectionId, setConnectionId] = useState(null);

    const handleNameInput = (event) => {
        setPlayerName(event.target.value);
    }

    const handleReadyClick = () => {
        if (!playerCreated) {
            setPlayerCreated(true);
        }
        emitData('playerReady', {playerName: playerName, playerCreated: playerCreated, playerReady: playerReady});
        setPlayerReady(!playerReady);
    }

    useEffect(() => {

        socket.on('idReturned', (data) => {
            setConnectionId(data);
            console.log('id returned', data);
            setNumberReady(numberReady + 1);
        })

        socket.on('playersReady', (data) => {
            setNumberReady(data);
        })

        socket.on('AllReady', () => {
            console.log("all ready");
            setEveryoneReady(true);
        })

    }, [playerReady])

    return (
        <>
            <div>
                <h2>Waiting room</h2>
                <label>Enter you name:</label>
                <input type="text" placeholder="____" value={playerName} onChange={handleNameInput} autoFocus />
                {!playerReady ? (
                    <button onClick={handleReadyClick}>Ready?</button>
                ) : (
                    <button onClick={handleReadyClick}>Ready!</button>
                )}
                <p>{numberReady}/2 ready</p>
            </div>
            {everyoneReady ? (
                <Redirect to="/play" />
            ) : (
                null
            )}
        </>
        

        
    );
}

export default WaitingRoom;