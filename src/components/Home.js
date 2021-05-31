import {Link} from 'react-router-dom'

import "./Home.css";

const Home = () => {
    return (
        <>
            <h1> 4NSWERS </h1>
            <Link to="/select-players"><button class="home-button">New Game!</button></Link>
        </>
    );
}

export default Home;