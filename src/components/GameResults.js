import {Link} from 'react-router-dom';
import './Results.css'

const GameResults = ({playerScores}) => {
    return (
        <>
            <p className="results-header">Game Results</p>
            <p className="results">{playerScores[0].score} <span>points</span></p>
            <Link to="/"><button>Home</button></Link>
        </>
    );
}

export default GameResults;