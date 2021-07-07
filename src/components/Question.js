import './Question.css'

const Question = ({questionText}) => {
    return (
        <section className="section-box">
            <h3 className="question">{questionText}</h3>
        </section>

    );
}

export default Question;