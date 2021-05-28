const PlayerInput = ({playerInput, placeholder, handleInputChange}) => {

    const handleKeyPress = (event) => {
        handleInputChange(event);
    }

    return (
        <input type="text" placeholder={placeholder} onKeyUp={handleKeyPress} value={playerInput} onChange={function() {}} autoFocus/>
    );
}

export default PlayerInput;