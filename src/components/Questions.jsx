import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'
import Question from './Question'

function Questions() {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [formData, setFormData] = useState({})
  const [quiz, setQuiz] = useState(
    { isCompleted: false, missingAnswers: false, questionCount: 0, answeredCorrectly: 0 }
  )

  function getQuestions() {
    setLoading(true)
    fetch("https://opentdb.com/api.php?amount=5")
      .then(response => response.json())
      .then(data => {
        const questions = data.results.map(questionData => {
          return {
            ...questionData,
            answers: [...questionData.incorrect_answers, questionData.correct_answer],
            id: nanoid()
          }
        })

        setQuestions(questions)
        setQuiz(prevState => ({...prevState, questionCount: questions.length}))
        setLoading(false)
      })    
  }
  
  useEffect(() => {
    getQuestions()
  }, [])

  useEffect(() => {
    const formData = questions.map(question => {
      return {
        id: question.id,
        question: question.question,
        answers: question.answers.map((answer, index) => (
          {
            id: `${question.id}-answer${index+1}`,
            answer: answer,
            checked: false
          })
        )
      }
    })

    setFormData(formData)
  }, [questions])

  function checkAnswers(event) {
    event.preventDefault()

    const correctAnswers = questions.map(question => question.correct_answer)

    let answeredCorrectlyCount = 0;

    let missingAnswer = false
    formData.forEach((question, index) => {
      const selectedAnswer = question.answers.find(x => x.checked)

      if (!selectedAnswer) {
        missingAnswer = true
        return;
      }

      if (correctAnswers[index] === selectedAnswer.answer) {
        answeredCorrectlyCount++
      }
    });

    if (missingAnswer) {
      setQuiz(prevState => ({
        ...prevState, isCompleted: false, missingAnswers: true
      }))
    }
    else {
      setQuiz(prevState => ({
        ...prevState, isCompleted: true, answeredCorrectly: answeredCorrectlyCount
      }))
    }
  }

  function playAgain() {
    setQuiz({ isCompleted: false, missingAnswers: false, questionCount: 0, answeredCorrectly: 0 })
    getQuestions()
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading"></div>
      </div>
    )
  }

  const questionElements = questions.map(question => 
    <Question 
      key={question.id} 
      questionData={question} 
      formData={formData} 
      setFormData={setFormData}
      quiz={quiz} />
  )

  return (
    <form onSubmit={checkAnswers}>
      {questionElements}
      <div className='form-btn-wrapper'>
        {
          !quiz.isCompleted 
          ?
          <div>
            <button type="submit">Check answers</button>
            {quiz.missingAnswers && <p>Missing answers. Check you have filled in all the questions.</p>}
          </div>
          :
          <div className="answered-correctly">
            <p>You Scored {`${quiz.answeredCorrectly}/${quiz.questionCount}`} correct answers</p>
            <button onClick={playAgain}>Play again</button>
          </div>
        }
      </div>
    </form>
  )
}

export default Questions