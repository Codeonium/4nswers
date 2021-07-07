import {Link} from 'react-router-dom';

const GameResults = ({playerTotalScore}) => {
    return (
        <>
            <p className="results-header">Game Results</p>
            <p className="results">{playerTotalScore} points</p>
            <Link to="/"><button>Home</button></Link>
        </>
    );
}

export default GameResults;