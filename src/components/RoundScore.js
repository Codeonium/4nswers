const RoundScore = ({playerRoundScore, showScore}) => {
    if (showScore) {
        return (
            <h2>+ {playerRoundScore.toLocaleString()} points!</h2>
        );
    } else {
        return (
            <>
            </>
        )
    }
    
}

export default RoundScore;