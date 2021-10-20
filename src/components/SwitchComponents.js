function SwitchComponents({ gameState, children }) {
  return children.filter((el) => el.props.gameState === gameState)
}

export default SwitchComponents
