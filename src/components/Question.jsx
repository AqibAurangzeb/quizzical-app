import Answer from './Answer'
import he from 'he'

function Question(props) {
  const { formData, setFormData, quiz } = props
  const { id, question, answers } = props.questionData

  const answerElements = answers.map((answer, index) => {
    return <Answer 
      key={answer.id} 
      questionId={id} 
      answerId={answer.id} 
      answer={he.decode(answer.answer)} 
      answerIndex={index} 
      formData={formData} 
      setFormData={setFormData} 
      quiz={quiz} />
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