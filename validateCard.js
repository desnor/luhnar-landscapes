'use strict'

module.exports = function validateCard(cardNumber) {
  const nums = cardNumber.split('').reverse().map(Number)
  let all = []

  for (const [index, n] of nums.entries()) {
    if (index % 2 !== 0) all.push(doubleAndPrepare(n))
    else all.push(n)
  }

  const total = all.reduce(sum, 0)

  return total % 10 === 0
}

function doubleAndPrepare(n) {
  const double = n * 2
  return double > 9 ? prepareLarge(double) : double
}
function prepareLarge(n) { return String(n).split('').map(Number).reduce(sum) }
function sum(a, b) { return a + b }
