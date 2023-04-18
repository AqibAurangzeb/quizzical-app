import React, { useState } from 'react';
import Intro from './components/Intro'
import Questions from './components/Questions'
import blueBlob from './assets/blue-blob-large.png'
import yellowBlob from './assets/yellow-blob-large.png'

function App() {

  const [isQuizStarted, setisQuizStarted] = useState(false)
  const styles = {
    width: !isQuizStarted ? "20%" : "15%"
  }

  return (
    <div>
      <img className="intro--blue-blob" style={styles} src={blueBlob} />
      {!isQuizStarted ? <Intro setisQuizStarted={setisQuizStarted} /> : <Questions />}
      <img className="intro--yellow-blob" style={styles} src={yellowBlob} />
    </div>
  )
}

export default App
