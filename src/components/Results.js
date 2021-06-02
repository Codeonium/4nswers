import './Results.css'

const Results = ({playerTotalScore}) => {
    return (
        <h3 className="leader">{playerTotalScore}</h3>
    );
}

export default Results;