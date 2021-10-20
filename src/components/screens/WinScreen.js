import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

const WinScreen = () => {
  const { Restart, _currentScore } = useContext(AppContext)
  const [currentScore] = _currentScore

  return (
    <section>
      <h1>Score: {currentScore}</h1>
      <h1>YOU WON!</h1>
      <button onClick={Restart}>Play again?</button>
    </section>
  )
}

export default WinScreen
