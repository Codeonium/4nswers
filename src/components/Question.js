import './Question.css'

const Question = ({questionText}) => {
    return (
        <section class="section-box">
            <h3 class="question">{questionText}</h3>
        </section>

    );
}

export default Question;