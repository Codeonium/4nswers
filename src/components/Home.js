import {Link} from 'react-router-dom'

import "./Home.css";

const Home = () => {
    return (
        <>
            <h1 className="title"> 4NSWERS </h1>
            <Link to="/waiting-room"><button className="home-button"><p>New Game!</p></button></Link>
            <div  className="rules">
                <p>4 questions - 8 seconds</p>
                <p>1 digit answer and 1 more each round</p>
                <p>Move to next question automatically</p>
            </div>
            
        </>
    );
}

export default Home;