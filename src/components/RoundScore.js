const RoundScore = ({playerRoundScore}) => {
    return (
        <h2>+ {playerRoundScore.toLocaleString()} points!</h2>
    );
}

export default RoundScore;