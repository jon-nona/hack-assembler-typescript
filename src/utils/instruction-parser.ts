import R from 'ramda'

const isSymbolOrAInstruction = R.pipe(R.head, R.equals('@'))
const isAllDigits = R.pipe(R.match(/\d+/), R.length, R.gt(R.__, 0))
const isAllLetters = R.pipe(R.match(/[A-Za-z]+/), R.length, R.gt(R.__, 0))

export const isAInstruction = R.allPass([
  isSymbolOrAInstruction,
  R.pipe(R.drop(1), isAllDigits),
])

export const isSymbol = R.allPass([
  isSymbolOrAInstruction,
  R.pipe(R.drop(1), isAllLetters),
])
