function Intro(props) {
  return (
    <section className="intro">
      <h1 className="intro--title">Quizzical</h1>
      <p className="intro--subtitle">Challenge yourself to a round of trivia!</p>
      <button className="intro--start-quiz-btn" onClick={() => props.setisQuizStarted(true)}>Start Quiz</button>
    </section>
  )
}

export default Intro
