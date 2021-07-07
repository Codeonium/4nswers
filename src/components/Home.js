import {Link} from 'react-router-dom'

import "./Home.css";

const Home = () => {
    return (
        <>
            <h1 className="title"> 4NSWERS </h1>
            <Link to="/select-players"><button className="home-button"><p>New Game!</p></button></Link>
        </>
    );
}

export default Home;