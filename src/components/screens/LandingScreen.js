import React from 'react'

const Landing = ({ onStartGame }) => {
  const startGame = () => {
    onStartGame()
  }
  return (
    <section
      className='landing'
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0 , 0.5)),url('/cat.jpg')",
      }}
    >
      <div className='logo'></div>
      <h1>What has more views on YouTube?</h1>
      <button onClick={startGame}>New Game</button>
    </section>
  )
}

export default Landing
