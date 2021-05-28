import {Link} from 'react-router-dom'

const SelectPlayers = () => {
    return (
        <>
            <h1>How many players?</h1>
            <Link to="play"><button>1</button></Link>
            <Link to="play"><button>2</button></Link>
            <Link to="play"><button>3</button></Link>
            <Link to="play"><button>4</button></Link>
        </>
    );
}

export default SelectPlayers;