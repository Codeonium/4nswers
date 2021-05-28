import {Link} from 'react-router-dom'

const GameResults = ({playerTotalScore}) => {
    return (
        <>
            <h4>Game Results</h4>
            <p>{playerTotalScore}</p>
            <Link to="/"><button>Home</button></Link>
        </>
    );
}

export default GameResults;