import {useState, useEffect} from 'react'

import GamePlay from '../components/GamePlay.js'
import GameResults from '../components/GameResults.js'

const Game = () => {

    const [gameRound, setGameRound] = useState(1);
    const [playerInput, setPlayerInput] = useState("");
    const [placeholder, setPlaceholder] = useState("");
    const [question, setQuestion] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(5 * 1000);
    const [intervalId, setIntervalId] = useState(null);
    const [playerRoundScore, setPlayerRoundScore] = useState(0);
    const [playerTotalScore, setPlayerTotalScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [endOfGame, setEndOfGame] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const getRandomNumber = (maxNumber) => {
        return Math.min(Math.floor(Math.random() * (maxNumber + 1)), 6);
    }


    const fetchQuestion = () => {
        fetch(`https://quest-questions-answers-api.herokuapp.com/${gameRound}`)
        .then(res => res.json())
        .then(data => {
            const randomQuestionIndex = getRandomNumber(data.length)
            setQuestion(data[randomQuestionIndex])
        });
    }

    const handleInputChange = (event) => {
        const keyPressed = event.key;
        if((event.target.value === "delete" || keyPressed === "Backspace") && playerInput.length > 0) {
            setPlayerInput(playerInput.slice(0, -1))
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

    const updatePlaceholder = () => {
        for (let i = 0; i < gameRound; i++) {
            setPlaceholder(placeholder + " *");
        }
    }


    const setTimer = () => {
            const interval = setInterval(() => {
                    setTimeRemaining(timeRemaining => timeRemaining - 1000);
            }, 1000);
            setIntervalId(interval);            
    }

    const stopCountdown = () => {
        clearInterval(intervalId);
        setIntervalId(null);
    }

    const nextRound = () => {
        calculateRoundScore();
        setShowScore(true);
        setPlayerInput("");
        if (gameRound === 4) {
            setEndOfGame(true);
        }
        setTimeout(() => {
            if (gameRound < 4) {
                setShowScore(false);
                setGameRound(gameRound + 1);
                setTimeRemaining(5 * 1000);
                setTimer();
            }

        }, 3000)
        
    }

    const calculateRoundScore = () => {
        setPlayerRoundScore(( playerInput / Math.max(playerInput, 1) ) * (10000 - (Math.abs(question.answer - playerInput) * (10 ** (4 - gameRound)))));
    }

    const addToTotalScore = () => {
        setPlayerTotalScore(playerTotalScore + playerRoundScore);
    }

    const handleShowResultsButton = () => {
        setShowResults(true);
    }

    useEffect(() => {
        updatePlaceholder();
    }, [gameRound])

    useEffect(() => {
        fetchQuestion();
    }, [gameRound])

    useEffect(() => {
        setTimer();
    }, [])

    useEffect(() => {
        if(timeRemaining <= 0 ) {
            stopCountdown();
            nextRound();
        }
    }, [timeRemaining])

    useEffect(() => {
        addToTotalScore();
    }, [playerRoundScore])
    
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