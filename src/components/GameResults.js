import {Link} from 'react-router-dom';

const GameResults = ({playerTotalScore}) => {
    return (
        <>
            <p class="results-header">Game Results</p>
            <p class="results">{playerTotalScore} points</p>
            <Link to="/"><button>Home</button></Link>
        </>
    );
}

export default GameResults;