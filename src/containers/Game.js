import {useState, useEffect} from 'react'
import io from 'socket.io/client-dist/socket.io';

import GamePlay from '../components/GamePlay.js'
import GameResults from '../components/GameResults.js'

const Game = () => {

    const [gameRound, setGameRound] = useState(1);
    const [playerInput, setPlayerInput] = useState("");
    const [placeholder, setPlaceholder] = useState(" _ ");
    const [question, setQuestion] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(5 * 1000);
    const [intervalId, setIntervalId] = useState(null);
    const [playerRoundScore, setPlayerRoundScore] = useState(0);
    const [playerTotalScore, setPlayerTotalScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [endOfGame, setEndOfGame] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [socket, setSocket] = useState(io("http://localhost:3001"));

    // const getRandomNumber = (maxNumber) => {
    //     return Math.floor(Math.random() * (maxNumber + 1));
    // }

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
                    setTimeRemaining(timeRemaining - 1000);
                    if (timeRemaining <= 0) {
                        stopTimer();
                        socket.emit('playerInput', playerInput);
                    }
            }, 1000);
            setIntervalId(interval);            
    }

    const stopTimer = () => {
        clearInterval(intervalId);
        setIntervalId(null);
    }

    const nextRound = () => {
        setShowScore(true);
        setTimeout(() => {
                setShowScore(false);
                setPlayerInput("");
                socket.emit('nextRound', true);
        }, 3000)
        
    }

    // const calculateRoundScore = () => {
    //     setPlayerRoundScore(( playerInput / Math.max(playerInput, 1) ) * (10000 - (Math.abs(question.answer - playerInput) * (10 ** (4 - gameRound)))));
    // }

    // const addToTotalScore = () => {
    //     setPlayerTotalScore(playerTotalScore + playerRoundScore);
    // }

    const handleShowResultsButton = () => {
        setShowResults(true);
    }

    useEffect(() => {
        socket.emit('start game');
    
        socket.on('message', (msg) => {
            console.log(msg);
        })

        socket.on('timer update', (data) => {
            setTimeRemaining(data);
        })

        socket.on('question', (data) => {
            setQuestion(data);
            startTimer();
        })

        socket.on('roundScore', (data) => {
            setPlayerRoundScore(data);
        })

        socket.on('placeholder', (data) => {
            setPlaceholder(data);
        })

        socket.on('gameRound', (data) => {
            setGameRound(data);
        })
        
        socket.on('totalScore', (data) => {
            setPlayerTotalScore(data);
            setEndOfGame(true);
            setShowResults(true);
        })

    }, [socket])

    // useEffect(() => {
    //     for (let i = 0; i < gameRound; i++) {
    //         setPlaceholder(placeholder + " _ ");
    //     }
    // }, [gameRound])

    // useEffect(() => {
    //     fetch(`https://quest-questions-answers-api.herokuapp.com/${gameRound}`)
    //     .then(res => res.json())
    //     .then(data => {
    //         const randomQuestionIndex = getRandomNumber(data.length-1)
    //         setQuestion(data[randomQuestionIndex])
    //     });
    // }, [gameRound])

    // useEffect(() => {
    //     setTimer();
    // }, [])

    useEffect(() => {
            nextRound();
        }, [playerRoundScore])

    // useEffect(() => {
    //     addToTotalScore();
    // }, [gameRound, endOfGame])
    
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
                <GameResults playerTotalScore={playerTotalScore}/>
            )}
            
        </>
    );
}

export default Game;