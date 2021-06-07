import {useState, useEffect} from 'react'

import GamePlay from '../components/GamePlay.js'
import GameResults from '../components/GameResults.js'

import {openConnection, emitData} from '../containers/SocketController.js';

const Game = (connectionId) => {

    const [gameRound, setGameRound] = useState(1);
    const [playerInput, setPlayerInput] = useState("");
    const [placeholder, setPlaceholder] = useState("");
    const [question, setQuestion] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(8 * 1000);
    const [intervalId, setIntervalId] = useState(null);
    const [playerRoundScore, setPlayerRoundScore] = useState(0);
    const [playerTotalScore, setPlayerTotalScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [endOfGame, setEndOfGame] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [playerScores, setPlayerScores] = useState([]);

    const socket = openConnection();

    const handleInputChange = (event) => {
        
        const keyPressed = event.key;
        if((event.target.value === "delete" || keyPressed === "Backspace") && playerInput.length > 0) {
            setPlayerInput(playerInput.slice(0, -1));
            return;
        }
        if (event.type === "click" && playerInput.length < gameRound) {
            setPlayerInput(playerInput + event.target.value);
            return;
        }
        if (event.type === "keyup" && keyPressed.match(/[0-9]/) && playerInput.length < gameRound) {
            setPlayerInput(playerInput + keyPressed);
        }
    }


    const startTimer = () => {
            const interval = setInterval(() => {
                    setTimeRemaining(timeRemaining => timeRemaining - 1000);
            }, 1000);
            setIntervalId(interval);            
    }

    const stopTimer = () => {
        clearInterval(intervalId);
        setIntervalId(null);
    }

    const nextRound = () => {
        setPlayerInput("");
        setTimeRemaining(8000);
    }

    const addToTotalScore = () => {
        setPlayerTotalScore(playerTotalScore + playerRoundScore);
    }

    const handleShowResultsButton = () => {
        setShowResults(true);
    }

    useEffect(() => {
        emitData('start game', null);

        socket.on('question', (data) => {
            setQuestion(data);
            setGameRound(data.roundNumber);
            startTimer();
        })

        socket.on('roundScore', (data) => {
            setPlayerRoundScore(data);
            addToTotalScore();
            setShowScore(true);
            nextRound();
            setTimeout(() => {
                setShowScore(false);
            }, 2000)
        })

        socket.on('placeholder', (data) => {
            setPlaceholder(data);
        })
        
        socket.on('endOfGame', (data) => {
            setPlayerScores(data);
            setEndOfGame(true);
            setShowResults(true);
            socket.disconnect();
            socket.connect();
        })

    }, [])

    useEffect(() => {
        if (timeRemaining <=  0) {
            stopTimer();
            setTimeRemaining(0);
            emitData('playerInput', {input: playerInput, userId: connectionId});
        }
    }, [timeRemaining])

    useEffect(() => {
        for (let i = 1; i <= gameRound; i++) {
            setPlaceholder( placeholder + " - ");
        }
    }, [gameRound])
    
    return (
        <>
            { !showResults ? (
                <GamePlay
                    gameRound={gameRound}
                    placeholder={placeholder}
                    question={question}
                    playerInput={playerInput}
                    handleInputChange={(event) => handleInputChange(event)}
                    timeRemaining={timeRemaining}
                    playerRoundScore={playerRoundScore}
                    showScore={showScore}
                    endOfGame={endOfGame}
                    handleShowResultsButton={() => handleShowResultsButton()}
            />
            ) : (
                <GameResults playerScores={playerScores}/>
            )}
            
        </>
    );
}

export default Game;