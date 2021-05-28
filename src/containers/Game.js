import {useState} from 'react'

import Question from '../components/Question.js'
import PlayerInput from '../components/PlayerInput.js'
import Timer from '../components/Timer.js'

const Game = () => {

    const [gameRound, setGameRound] = useState(1);
    
    return (
        <>
            <Question />
            <PlayerInput gameRound={gameRound} />
            <Timer />
        </>
    );
}

export default Game;