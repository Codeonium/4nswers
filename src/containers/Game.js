import {useState} from 'react'

import Question from '../components/Question.js'
import PlayerInput from '../components/PlayerInput.js'
import Timer from '../components/Timer.js'

const Game = () => {

    const [gameRound, setGameRound] = useState(1);
    const [playerInput, setPlayerInput] = useState("");

    const handleInputChange = (event) => {
        const keyPressed = event.key;
        if(keyPressed === "Backspace" && playerInput.length > 0) {
            setPlayerInput(playerInput.slice(0, -1))
        }
        if (keyPressed.match(/[0-9]/) && playerInput.length < gameRound) {
            setPlayerInput(playerInput + keyPressed);
        }
    }
    
    return (
        <>
            <Question />
            <PlayerInput 
                playerInput={playerInput} 
                handleInputChange={(event) => handleInputChange(event)} 
            />
            <Timer />
        </>
    );
}

export default Game;