import Question from '../components/Question.js'
import PlayerInput from '../components/PlayerInput.js'
import Timer from '../components/Timer.js'
import RoundScore from '../components/RoundScore.js'

const GamePlay = ({gameRound, question, playerInput, placeholder, handleInputChange, timeRemaining, playerRoundScore, showScore, endOfGame, handleShowResultsButton}) => {
    return (
        <>
            <Question questionText={question.question}/>
            <PlayerInput 
                gameRound={gameRound}
                playerInput={playerInput} 
                placeholder={placeholder}
                handleInputChange={(event) => handleInputChange(event)} 
            />
            <Timer timeRemaining={timeRemaining}/>
            <RoundScore playerRoundScore={playerRoundScore} showScore={showScore}/>
            { endOfGame ? (
                <button onClick={handleShowResultsButton}>Show results</button>
            ) : (
                null
            )}
        </>
    );
}

export default GamePlay;