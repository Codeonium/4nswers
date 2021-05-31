const RoundScore = ({playerRoundScore, showScore}) => {
    if (showScore) {
        return (
            <h2 className="score title">+ {playerRoundScore.toLocaleString()} points!</h2>
        );
    } else {
        return (
            null
        )
    }
    
}

export default RoundScore;