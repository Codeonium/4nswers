import Question from '../components/Question.js'
import PlayerInput from '../components/PlayerInput.js'
import Timer from '../components/Timer.js'
import RoundScore from '../components/RoundScore.js'

const GamePlay = ({question, playerInput, placeholder, handleInputChange, timeRemaining, playerRoundScore, showScore}) => {
    
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

export default GamePlay;