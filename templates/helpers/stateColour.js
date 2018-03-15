module.exports = function stateColour (context) {
  const { state } = context.data.root
  return state === 'valid' ? 'light-green' : state === 'invalid' ? 'light-red' : ''
}
