import Answer from './Answer'
import he from 'he'

function Question(props) {
  const { formData, setFormData } = props
  const { id, question, answers } = props.questionData

  const answerElements = answers.map((answer, index) => {
    return <Answer key={`${id}-answer${index+1}`} questionId={id} answerId={`${id}-answer${index+1}`} answer={he.decode(answer)} answerIndex={index} formData={formData} setFormData={setFormData} />
  })

  return (
    <div className="question">
      <h4>{he.decode(question)}</h4>
      <div className="question--form-control">
        {answerElements}
      </div>
    </div>
  )
}

export default Question