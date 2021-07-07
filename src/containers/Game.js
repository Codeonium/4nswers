import {useState, useEffect} from 'react'
import io from 'socket.io/client-dist/socket.io';

import GamePlay from '../components/GamePlay.js'
import GameResults from '../components/GameResults.js'

const socket = io("http://localhost:3001");

const Game = () => {

    const [connectionId, setConnectionId] = useState("");
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

    const getRandomNumber = (maxNumber) => {
        return Math.floor(Math.random() * (maxNumber + 1));
    }

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

    const setTimer = () => {
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
        for (let i = 0; i < gameRound; i++) {
            setPlaceholder(placeholder + " _ ");
        }
    }, [gameRound])

    useEffect(() => {
        fetch(`https://quest-questions-answers-api.herokuapp.com/${gameRound}`)
        .then(res => res.json())
        .then(data => {
            const randomQuestionIndex = getRandomNumber(data.length - 1)
            setQuestion(data[randomQuestionIndex])
        });
    }, [gameRound])


    useEffect(() => {
        if (timeRemaining <=  0) {
            stopTimer();
            setTimeRemaining(0);
            socket.emit('playerInput', {input: playerInput, userId: connectionId});
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
            )}
            
        </>
    );
}

export default Game;