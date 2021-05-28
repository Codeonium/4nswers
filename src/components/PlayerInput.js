import {useState, useEffect} from 'react';

const PlayerInput = ({gameRound, playerInput, placeholder, handleInputChange}) => {

    const [inputArray, setInputArray] = useState([]);

    const handleKeyPress = (event) => {
        handleInputChange(event);
    }
    
    const updateInputArray = () => {
            setInputArray([...inputArray, 
                <input type="text" placeholder="*" onKeyUp={handleKeyPress} value={playerInput} onChange={function() {}} />
            ])
    }

    useEffect(() => {
        updateInputArray();
    }, [gameRound])


    return (
        <>
            {inputArray}
        </>
    );
}

export default PlayerInput;