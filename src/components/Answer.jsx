function Answer(props) {
  const { questionId, answerId, answer, answerIndex, formData, setFormData } = props

  const questionIndex = formData.findIndex(x => x.id === questionId)

  function handleChange(event) {
    const { checked } = event.target

    setFormData(prevFormData => {
      const newData = [...prevFormData]

      newData[questionIndex].answers.forEach((answer, index) => {
        answer.checked = index === answerIndex ? checked : false
      });

      return newData
    })
  }

  return (
    <div>
          <input 
            type="radio" 
            id={answerId}
            name={questionId}
            checked={formData[questionIndex]?.answers[answerIndex]?.checked ?? false}
            onChange={handleChange}
          />
          <label className="question--answer" htmlFor={answerId}>{answer}</label>
    </div>
  )
}

export default Answer