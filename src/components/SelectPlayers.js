import {Link} from 'react-router-dom'

import "./SelectPlayers.css"

const SelectPlayers = () => {
    return (
        <>
            <h1>How many players?</h1>
            <Link to="play"><button class="player-button">1</button></Link>
            <Link to="play"><button class="player-button">2</button></Link>
            <Link to="play"><button class="player-button">3</button></Link>
            <Link to="play"><button class="player-button">4</button></Link>
        </>
    );
}

export default SelectPlayers;