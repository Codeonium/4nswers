import {Link} from 'react-router-dom'

const SelectPlayers = () => {
    return (
        <>
            <section>
                <h1>How many players?</h1>
                <Link to="play-game"><button>1</button></Link>
                <Link to="play-game"><button>2</button></Link>
                <Link to="play-game"><button>3</button></Link>
                <Link to="play-game"><button>4</button></Link>
            </section>
        </>
    );
}

export default SelectPlayers;