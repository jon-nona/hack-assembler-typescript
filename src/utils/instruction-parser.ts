import R from 'ramda'
import { leftPad } from './string'
import { CInstructionValue } from './types'

const cInstructionRegex = /^(?<dest>M|D|MD|A|AM|AD|AMD)=(?<comp>0|1|-1|![ADM]|D[+-][AM]|[AM]-D|D[&|]A|A[&|]D|D[&|]M|M[&|]D|[ADM][+-]?1?);?(?<jump>JGT|JEQ|JGE|JLT|JNEJLE|JMP)?$/

const isSymbolOrAInstruction = R.pipe(R.head, R.equals('@'))
const isAllDigits = R.pipe(R.match(/\d+/), R.length, R.gt(R.__, 0))
const isAllLetters = R.pipe(R.match(/[A-Za-z]+/), R.length, R.gt(R.__, 0))

export const isAInstruction = R.allPass([
  isSymbolOrAInstruction,
  R.pipe(R.drop(1), isAllDigits),
])

export const isSymbol: boolean = R.allPass([
  isSymbolOrAInstruction,
  R.pipe(R.drop(1), isAllLetters),
])

const decimalToBinaryString = (x: number): string => x.toString(2)

export const convertAInstructionToBinary: (
  aInstruction: string,
) => string = R.pipe(R.drop(1), parseInt, decimalToBinaryString, leftPad(16))

export const parseCInstruction: (value: string) => CInstructionValue = R.pipe(
  R.match(cInstructionRegex),
  R.slice(1, 4),
  R.zipObj(['dest', 'comp', 'jump']),
  R.reject(R.isNil),
)
