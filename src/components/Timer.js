import './Timer.css'

const Timer = ({timeRemaining}) => {
    return (
        <p class="timer">{timeRemaining/1000}s</p>
    );
}

export default Timer;