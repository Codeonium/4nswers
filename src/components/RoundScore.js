const RoundScore = ({playerRoundScore, showScore}) => {
    if (showScore) {
        return (
            <h2 class="score">+ {playerRoundScore.toLocaleString()} points!</h2>
        );
    } else {
        return (
            null
        )
    }
    
}

export default RoundScore;