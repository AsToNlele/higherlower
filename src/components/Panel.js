import React from 'react'

// Number format for view count
const nf = new Intl.NumberFormat('en-US')

const Interractive = ({ currentVideo, onOptionPick, showNumber }) => {
  return (
    <>
      <div
        className='center-panel'
        style={{ display: showNumber ? 'none' : 'flex' }}
      >
        <h1>"{currentVideo.title}"</h1>
        <p>has</p>
        <button className='button-game' onClick={() => onOptionPick(true)}>
          Higher
        </button>
        <button className='button-game' onClick={() => onOptionPick(false)}>
          Lower
        </button>
        <p>views on Youtube than</p>
        <p>"{currentVideo.title}"</p>
      </div>
      <div
        className='center-panel'
        style={{ display: showNumber ? 'flex' : 'none' }}
      >
        <h1>"{currentVideo.title}"</h1>
        <p>has</p>
        <p className='game-views'>{nf.format(currentVideo.views)}</p>
        <p>views on YouTube</p>
      </div>
    </>
  )
}

const NonInterractive = ({ currentVideo }) => {
  return (
    <div className='center-panel'>
      <h1>"{currentVideo.title}"</h1>
      <p>has</p>
      <p className='game-views'>{nf.format(currentVideo.views)}</p>
      <p>views on YouTube</p>
    </div>
  )
}

export const Panel = ({
  currentVideo,
  isInterractive,
  showNumber,
  onOptionPick,
}) => {
  const OptionPick = (result) => {
    onOptionPick(result)
  }
  return (
    <div
      className='game-window'
      style={{
        backgroundImage: `url("https://img.youtube.com/vi/${currentVideo.thumbnail}/hqdefault.jpg")`,
      }}
    >
      {isInterractive ? (
        <Interractive
          currentVideo={currentVideo}
          onOptionPick={OptionPick}
          showNumber={showNumber}
        />
      ) : (
        <NonInterractive currentVideo={currentVideo} />
      )}
    </div>
  )
}
