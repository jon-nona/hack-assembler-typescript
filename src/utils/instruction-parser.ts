import R from 'ramda'
import { leftPad } from './string'
import {
  compTable,
  destTable,
  jumpTable,
  predefinedSymbolsTable,
} from './tables'
import { CInstructionValue, SymbolTable } from './types'

/*
Regex for parsing a c-instruction and capturing the various instructions out of it. Assumes the instruction has already been
trimmed of spaces.
- Optional non capturing group surrounding a capturing group of dest should it exist.
- dest - named dest capturing group. captures the dest command
- comp - named comp capturing group. matches on all the possible values of comp and captures them
- jump - named jump capturing group. matches on all the possible values of jump and captures them
*/
const cInstructionRegex = /(?:(?<dest>M|D|MD|A|AM|AD|AMD)=)?(?<comp>0|1|-1|[AD]|![ADM]|[AMD][+-][AMD]|[AMD]-[AMD]|D[&|]A|A[&|]D|D[&|]M|M[&|]D|[ADM][+-]?1?);?(?<jump>JGT|JEQ|JGE|JLT|JNE|JLE|JMP)?$/

const variableNameRegex = /^@[A-Za-z_.$0-9]+$/g
const isSymbolOrAInstruction = R.pipe(R.head, R.equals('@'))
const isAllDigits = R.pipe(R.match(/^\d+$/), R.length, R.gt(R.__, 0))
const isValidVariableName = R.test(variableNameRegex)

export const isAInstruction = R.allPass([
  isSymbolOrAInstruction,
  R.pipe(R.drop(1), isAllDigits),
])

const notInPredefinedSymbolsTable = R.complement(
  R.has(R.__, predefinedSymbolsTable),
)

export const isVariableOrLabelSymbol: (value: string) => boolean = R.allPass([
  isSymbolOrAInstruction,
  R.allPass([
    R.complement(isAInstruction),
    isValidVariableName,
    notInPredefinedSymbolsTable,
  ]),
])

export const labelRegex = /^\([A-Za-z_.$0-9]+\)$/g
export const isLabelSymbol: (value: string) => boolean = R.test(labelRegex)

export const isVariableOrLabelSymbolOrAInstruction = R.anyPass([
  isAInstruction,
  isVariableOrLabelSymbol,
])

export const decimalToBinaryString = (x: number): string => x.toString(2)

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
const calculateLabelAddress = (currentAddress: number, table: SymbolTable) =>
  R.subtract(currentAddress, currentLabelCount(table))
const addLabelToTable = R.curry(
  (label: string, currentAddress: number, table: SymbolTable) =>
    R.pipe(
      stripParentheses,
      R.concat('@'),
      R.assoc(R.__, calculateLabelAddress(currentAddress, table), table),
    )(label),
)
export const buildLabelSymbolTable: (
  instructions: string[],
) => SymbolTable = reduceIndexed(
  (table: { [key: string]: number }, line: string, index: number) =>
    R.ifElse(
      isLabelSymbol,
      addLabelToTable(R.__, index, table),
      R.always(table),
    )(line),
  {},
)

const addVariableToTable = R.curry((variable: string, table: SymbolTable) =>
  R.pipe(R.assoc(R.__, R.add(16, R.length(R.keys(table))), table))(variable),
)

const doesNotHaveProperty = R.complement(R.has)
export const buildVariableSymbolsTable = R.curry(
  (labelSymbols: SymbolTable, instructions: string[]): SymbolTable =>
    R.reduce(
      (table: { [key: string]: number }, line: string) =>
        R.ifElse(
          R.allPass([
            isVariableOrLabelSymbol,
            doesNotHaveProperty(R.__, labelSymbols),
            doesNotHaveProperty(R.__, table),
          ]),
          addVariableToTable(R.__, table),
          R.always(table),
        )(line),
      {},
    )(instructions),
)

const buildLabelSymbolsTableAndMergePredefinedSymbols = R.pipe(
  buildLabelSymbolTable,
  R.mergeRight(predefinedSymbolsTable),
)

export const buildSymbolsTable: (
  instructions: string[],
) => SymbolTable = R.pipe(
  R.juxt([buildLabelSymbolsTableAndMergePredefinedSymbols, R.identity]),
  R.juxt([R.head, R.apply(buildVariableSymbolsTable)]),
  R.mergeAll,
)
