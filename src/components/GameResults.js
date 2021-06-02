import {Link} from 'react-router-dom';

const GameResults = ({playerScores}) => {
    return (
        <>
            <p className="results-header">Game Results</p>
            <p className="results">{playerScores[0].score} points</p>
            <Link to="/"><button>Home</button></Link>
        </>
    );
}

export default GameResults;