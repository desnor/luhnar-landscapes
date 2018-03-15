module.exports = function message (context) {
  const { state } = context.data.root
  return state === 'valid' ? 'Card number is valid' : state === 'invalid' ? 'Card number is invalid' : ''
}
