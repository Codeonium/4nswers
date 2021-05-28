import {Link} from 'react-router-dom'

const Home = () => {
    return (
        <>
            <p> this is the home page. </p>
            <Link to="/select-players">New Game!</Link>
        </>
    );
}

export default Home;