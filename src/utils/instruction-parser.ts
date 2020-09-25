import R from 'ramda'
import { toLines } from './line-parser'
import { leftPad } from './string'
import { compTable, destTable, jumpTable } from './tables'
import { CInstructionValue } from './types'

/*
Regex for parsing a c-instruction and capturing the various instructions out of it. Assumes the instruction has already been
trimmed of spaces.
- Optional non capturing group surrounding a capturing group of dest should it exist.
- dest - named dest capturing group. captures the dest command
- comp - named comp capturing group. matches on all the possible values of comp and captures them
- jump - named jump capturing group. matches on all the possible values of jump and captures them
*/
const cInstructionRegex = /(?:(?<dest>M|D|MD|A|AM|AD|AMD)=)?(?<comp>0|1|-1|![ADM]|[AMD][+-][AMD]|[AMD]-[AMD]|D[&|]A|A[&|]D|D[&|]M|M[&|]D|[ADM][+-]?1?);?(?<jump>JGT|JEQ|JGE|JLT|JNEJLE|JMP)?$/

const isVariableSymbolOrAInstruction = R.pipe(R.head, R.equals('@'))
const isAllDigits = R.pipe(R.match(/\d+/), R.length, R.gt(R.__, 0))
const isAllLetters = R.pipe(R.match(/[A-Za-z]+/), R.length, R.gt(R.__, 0))

export const isAInstruction = R.allPass([
  isVariableSymbolOrAInstruction,
  R.pipe(R.drop(1), isAllDigits),
])

export const isVariableSymbol: (value: string) => boolean = R.allPass([
  isVariableSymbolOrAInstruction,
  R.pipe(R.drop(1), isAllLetters),
])

const labelRegex = /^\([A-Z]+\)$/g
export const isLabelSymbol = (value: string): boolean => labelRegex.test(value)

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

const lookupFunctions = [
  R.prop(R.__, compTable),
  R.propOr('000', R.__, destTable),
  R.propOr('000', R.__, jumpTable),
]

export const convertCInstructionToBinary: (
  value: CInstructionValue,
) => string = R.pipe(
  R.props(['comp', 'dest', 'jump']),
  R.zipWith(R.call, lookupFunctions),
  R.join(''),
  R.concat('111'),
)

const reduceIndexed = R.addIndex(R.reduce)
const parenthesesRegex = /[()]/g
const stripParentheses = R.replace(parenthesesRegex, '')
const currentLabelCount = R.pipe(R.keys, R.length)
const calculateLabelAddress = (
  currentAddress: number,
  map: {
    [key: string]: number
  },
) => R.subtract(currentAddress, currentLabelCount(map))
const addLabelToTable = R.curry(
  (label: string, currentAddress: number, table: { [key: string]: number }) =>
    R.pipe(
      stripParentheses,
      R.assoc(R.__, calculateLabelAddress(currentAddress, table), table),
    )(label),
)

export const buildLabelSymbolTable: (
  instructions: string[],
) => {
  [key: string]: number
} = reduceIndexed(
  (table: { [key: string]: number }, line: string, index: number) =>
    R.ifElse(
      isLabelSymbol,
      addLabelToTable(R.__, index, table),
      R.always(table),
    )(line),
  {},
)

const addVariableToTable = R.curry(
  (
    variable: string,
    table: {
      [key: string]: number
    },
  ) =>
    R.pipe(R.assoc(R.__, R.add(16, R.length(R.keys(table))), table))(variable),
)
export const buildVariableSymbolsTable: (
  instructions: string[],
) => {
  [key: string]: number
} = R.reduce(
  (table: { [key: string]: number }, line: string) =>
    R.ifElse(
      isVariableSymbol,
      addVariableToTable(R.__, table),
      R.always(table),
    )(line),
  {},
)
