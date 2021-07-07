import './Timer.css'

const Timer = ({timeRemaining}) => {
    return (
        <p className="timer">{timeRemaining/1000}s</p>
    );
}

export default Timer;