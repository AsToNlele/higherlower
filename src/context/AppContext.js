import React, { createContext, useState } from 'react'

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {
  const [allVideos, setAllVideos] = useState([])
  const [notPlayedVideos, setNotPlayedVideos] = useState([])
  const [currentVideos, setCurrentVideos] = useState([])
  const [currentScore, setCurrentScore] = useState(0)
  const [gameState, setGameState] = useState(0)

  const getRandomNumber = (maxVal) => {
    return Math.floor(Math.random() * maxVal)
  }

  const pickThreeVideos = async () => {
    let copyNotPlayedVideos = allVideos
    let currVids = []

    for (let i = 0; i < 3; i++) {
      let temp = getRandomNumber(notPlayedVideos.length - i)
      currVids.push(copyNotPlayedVideos[temp])
      copyNotPlayedVideos = copyNotPlayedVideos.filter((video, ind) => {
        return ind !== temp
      })
    }

    setNotPlayedVideos(copyNotPlayedVideos)
    setCurrentVideos(currVids)
  }

  const Restart = async () => {
    pickThreeVideos()
    setGameState(1)
  }

  return (
    <AppContext.Provider
      value={{
        _notPlayedVideos: [notPlayedVideos, setNotPlayedVideos],
        _currentVideos: [currentVideos, setCurrentVideos],
        _currentScore: [currentScore, setCurrentScore],
        _gameState: [gameState, setGameState],
        _allVideos: [allVideos, setAllVideos],
        getRandomNumber,
        Restart,
        pickThreeVideos,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
