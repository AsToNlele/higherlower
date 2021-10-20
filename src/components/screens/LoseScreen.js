import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

const LoseScreen = () => {
  const { Restart, _currentScore } = useContext(AppContext)
  const [currentScore] = _currentScore

  return (
    <div>
      <h1>Score: {currentScore}</h1>
      <h1>YOU LOST!</h1>
      <button onClick={Restart}>Play again?</button>
    </div>
  )
}

export default LoseScreen
