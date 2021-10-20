import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { useCookies } from 'react-cookie'
import { motion } from 'framer-motion'
import { Panel } from '../Panel'

const Game = () => {
  const {
    _notPlayedVideos,
    _currentVideos,
    _currentScore,
    _gameState,
    getRandomNumber,
  } = useContext(AppContext)
  const [notPlayedVideos, setNotPlayedVideos] = _notPlayedVideos
  const [currentVideos, setCurrentVideos] = _currentVideos
  const [currentScore, setCurrentScore] = _currentScore
  const [, setGameState] = _gameState
  const [cookies, setCookie] = useCookies(['highscore'])
  const [animate, setAnimate] = useState(false)
  const [showNumber, setShowNumber] = useState(false)
  const [animateCorrect, setAnimateCorrect] = useState(false)
  const [animateWrong, setAnimateWrong] = useState(false)
  const [animateVS, setAnimateVS] = useState(true)

  const animationVariants = {
    still: { x: 0, transition: { duration: 0 } },
    closed: { x: '-50vw', transition: { duration: 1 } },
  }

  const displayResultVariants = {
    still: {
      opacity: 0,
      transition: { type: 'spring', stiffness: 100, duration: 0.5 },
    },
    animating: {
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, duration: 0.5 },
    },
  }

  // Set Highscore on game start to 0 if cookie not set
  useEffect(() => {
    if (cookies.highscore === undefined) setCookie('highscore', 0)
  }, [cookies.highscore, setCookie])

  const checkWin = () => {
    if (currentScore >= 9) {
      setGameState(2)
      setCookie('highscore', 10)
    }
  }

  // 2 = Equal
  // 1 = Higher
  // 0 = Lower
  //
  const getResult = () => {
    if (currentVideos[1].views === currentVideos[0].views) {
      return 2
    }
    if (currentVideos[1].views > currentVideos[0].views) {
      return 1
    }
    return 0
  }

  const onOptionPick = (isHigher) => {
    setShowNumber(true)

    if (
      getResult() === 2 ||
      (getResult() === 1 && isHigher) ||
      (getResult() === 0 && isHigher === false)
    ) {
      // Correct pick
      setAnimateCorrect(true)
      setAnimateVS(false)
      checkWin()
      setCurrentScore((currentScore) => currentScore + 1)
      setTimeout(() => {
        setAnimate(true)
        setAnimateCorrect(false)
        setTimeout(() => {
          setShowNumber(false)
          setAnimateVS(true)
          setAnimate(false)
          pickNextVideo()
        }, 1000)
      }, 1000)
    } else {
      // Wrong pick
      setAnimateWrong(true)
      setTimeout(() => {
        setAnimateWrong(false)
        Lose()
      }, 1000)
    }
  }

  const pickNextVideo = () => {
    let randomNumber = getRandomNumber(notPlayedVideos.length)

    let copyNotPlayedVideos = notPlayedVideos

    copyNotPlayedVideos = copyNotPlayedVideos.filter((video, ind) => {
      return ind !== randomNumber
    })

    let currVids = currentVideos
    currVids.shift()
    currVids.push(notPlayedVideos[randomNumber])

    setNotPlayedVideos(copyNotPlayedVideos)
    setCurrentVideos(currVids)
  }

  const Lose = () => {
    if (cookies.highscore !== undefined) {
      if (currentScore > cookies.highscore) {
        setCookie('highscore', currentScore)
      }
    } else {
      setCookie('highscore', currentScore)
    }

    setGameState(3)
  }

  return (
    <section className='' style={{ width: '150vw' }}>
      <motion.div
        className='result-item'
        variants={displayResultVariants}
        animate={animateVS ? 'animating' : 'still'}
      >
        VS
      </motion.div>
      <motion.div
        className='wrong result-item'
        variants={displayResultVariants}
        animate={animateWrong ? 'animating' : 'still'}
      >
        ❌
      </motion.div>
      <motion.div
        className='correct result-item'
        variants={displayResultVariants}
        animate={animateCorrect ? 'animating' : 'still'}
      >
        ✅
      </motion.div>
      <div className='score-panel'>
        <div className='left'>
          Highscore: {cookies.highscore && <span>{cookies.highscore}</span>}
        </div>
        <div className='right'>Score: {currentScore}</div>
      </div>
      <motion.div
        variants={animationVariants}
        animate={animate ? 'closed' : 'still'}
        className='while-game'
      >
        <Panel currentVideo={currentVideos[0]} isInterractive={false} />

        <Panel
          currentVideo={currentVideos[1]}
          isInterractive={true}
          showNumber={showNumber}
          onOptionPick={onOptionPick}
        />

        <Panel
          currentVideo={currentVideos[2]}
          isInterractive={true}
          showNumber={!showNumber}
          onOptionPick={onOptionPick}
        />
      </motion.div>
    </section>
  )
}

export default Game
