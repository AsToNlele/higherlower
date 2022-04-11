import { useEffect, useContext } from 'react'
import LandingScreen from './components/screens/LandingScreen'
import SwitchComponents from './components/SwitchComponents'
import GameScreen from './components/screens/GameScreen'
import WinScreen from './components/screens/WinScreen'
import LoseScreen from './components/screens/LoseScreen'
import { AppContext } from './context/AppContext'

function App() {
  const { _gameState, _allVideos, _notPlayedVideos, pickThreeVideos } =
    useContext(AppContext)
  const [gameState, setGameState] = _gameState
  const [, setAllVideos] = _allVideos
  const [, setNotPlayedVideos] = _notPlayedVideos

  // gameState
  // 0 : Not Started
  // 1 : Started
  // 2 : Win
  // 3 : Lose

  // On Load
  useEffect(() => {
    const getVideos = async () => {
      let videos = await fetch("./videos.json").then( response => response.json())
      console.log(videos)
      setAllVideos(videos)
      setNotPlayedVideos(videos)
    }
    getVideos()
  }, [])

  const startGame = () => {
    pickThreeVideos()
    setGameState(1)
  }

  const onStartGame = () => {
    startGame()
  }

  return (
    <div className='App'>
      <SwitchComponents gameState={gameState}>
        <LandingScreen gameState={0} onStartGame={onStartGame} />
        <GameScreen gameState={1} />
        <WinScreen gameState={2} />
        <LoseScreen gameState={3} />
      </SwitchComponents>
    </div>
  )
}

export default App
