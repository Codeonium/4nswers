import "./Keypad.css";

const Keypad = ({handleButtonPress}) => {

    return (
        <div>
            <section>
                <button onClick={(event) => handleButtonPress(event, 'value')} value="1">1</button>
                <button onClick={(event) => handleButtonPress(event, 'value')} value="2">2</button>
                <button onClick={(event) => handleButtonPress(event, 'value')} value="3">3</button>
            </section>
            <section>
                <button onClick={(event) => handleButtonPress(event, 'value')} value="4">4</button>
                <button onClick={(event) => handleButtonPress(event, 'value')} value="5">5</button>
                <button onClick={(event) => handleButtonPress(event, 'value')} value="6">6</button>
            </section>
            <section>
                <button onClick={(event) => handleButtonPress(event, 'value')} value="7">7</button>
                <button onClick={(event) => handleButtonPress(event, 'value')} value="8">8</button>
                <button onClick={(event) => handleButtonPress(event, 'value')} value="9">9</button>
            </section>
            <section>
                <button onClick={(event) => handleButtonPress(event, 'value')} value="0">0</button>
                <button onClick={(event) => handleButtonPress(event, 'value')} value="delete" className="delete"><img src="https://cdn3.iconfinder.com/data/icons/social-productivity-line-art-3/128/delete-512.png" alt="delete" /></button>
            </section>
        </div>
    );
}

export default Keypad;