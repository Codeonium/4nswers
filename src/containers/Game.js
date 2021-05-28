import {useState, useEffect} from 'react'

import Question from '../components/Question.js'
import PlayerInput from '../components/PlayerInput.js'
import Timer from '../components/Timer.js'
import RoundScore from '../components/RoundScore.js'

const Game = () => {

    const [gameRound, setGameRound] = useState(1);
    const [playerInput, setPlayerInput] = useState("");
    const [placeholder, setPlaceholder] = useState("");
    const [roundNumber, setRoundNumber] = useState("one");
    const [question, setQuestion] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(5 * 1000);
    const [intervalId, setIntervalId] = useState(null);
    const [playerRoundScore, setPlayerRoundScore] = useState(0);
    const [playerTotalScore, setPlayerTotalScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const getRandomNumber = (maxNumber) => {
        return Math.floor(Math.random() * (maxNumber + 1));
    }


    const fetchQuestion = () => {
        fetch(`https://quest-questions-answers-api.herokuapp.com/${roundNumber}digit`)
        .then(res => res.json())
        .then(data => {
            const randomQuestionIndex = getRandomNumber(data.length)
            setQuestion(data[randomQuestionIndex])
        });
    }


    const handleInputChange = (event) => {
        const keyPressed = event.key;
        if(keyPressed === "Backspace" && playerInput.length > 0) {
            setPlayerInput(playerInput.slice(0, -1))
        }
        if (keyPressed.match(/[0-9]/) && playerInput.length < gameRound) {
            setPlayerInput(playerInput + keyPressed);
        }
    }

    const updatePlaceholder = () => {
        for (let i = 0; i < gameRound; i++) {
            setPlaceholder(placeholder + " *");
        }
    }

    const updateRoundNumber = () => {
        switch(gameRound) {
            case 1:
                setRoundNumber("one");
                break;
            case 2:
                setRoundNumber("two");
                break;
            case 3:
                setRoundNumber("three");
                break;
            case 4:
                setRoundNumber("four");
                break;
        }
    }

    const setTimer = () => {
            const interval = setInterval(() => {
                    setTimeRemaining(timeRemaining => timeRemaining - 10);
            }, 10);
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

    useEffect(() => {
        updatePlaceholder();
    }, [gameRound])

    useEffect(() => {
        updateRoundNumber();
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
            <Question questionText={question.question}/>
            <PlayerInput 
                playerInput={playerInput} 
                placeholder={placeholder}
                handleInputChange={(event) => handleInputChange(event)} 
            />
            <Timer timeRemaining={timeRemaining}/>
            <RoundScore playerRoundScore={playerRoundScore} showScore={showScore}/>
        </>
    );
}

export default Game;