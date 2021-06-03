import './PlayerInput.css';

import Keypad from './Keypad.js'

const PlayerInput = ({gameRound, playerInput, placeholder, handleInputChange}) => {

    const handleKeyPress = (event) => {
        handleInputChange(event);
    }

    const handleButtonPress = (event) => {
        handleInputChange(event);
    }

    return (
        <>
            <input 
                type="text" 
                placeholder={placeholder}
                onKeyUp={handleKeyPress} 
                value={playerInput} 
                onChange={function() {}} 
                autoFocus
            />
            <Keypad handleButtonPress={handleButtonPress}/>
        </>
    );
}

export default PlayerInput;