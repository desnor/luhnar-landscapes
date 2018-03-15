module.exports = function stateColour (context) {
  const { state } = context.data.root
  return state === 'valid' ? 'green' : state === 'invalid' ? 'light-red' : ''
}
