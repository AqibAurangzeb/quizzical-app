function Answer(props) {
  const { questionId, answerId, answer, answerIndex, formData, setFormData, quiz } = props
  const styles = {
    backgroundColor: quiz.answers.some(x => x.id === answerId && x.correct) 
      ? "#94D7A2" 
      : quiz.answers.some(x => x.id === answerId) && "#F8BCBC",
    color: quiz.answers.some(x => x.id === answerId && !x.correct) && "#293264"
  }
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
            disabled={quiz.isCompleted}
          />
          <label style={styles} className="question--answer" htmlFor={answerId}>{answer}</label>
    </div>
  )
}

export default Answer