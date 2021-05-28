const PlayerInput = ({playerInput, handleInputChange}) => {

    const handleKeyPress = (event) => {
        handleInputChange(event);
    }

    return (
        <input type="text" placeholder="* * * *" onKeyUp={handleKeyPress} value={playerInput} />
    );
}

export default PlayerInput;