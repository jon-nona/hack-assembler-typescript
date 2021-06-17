import R from 'ramda'
import {
  buildSymbolsTable,
  convertAInstructionToBinary,
  convertCInstructionToBinary,
  decimalToBinaryString,
  isAInstruction,
  labelRegex,
  parseCInstruction,
} from './utils/instruction-parser'
import {
  arrayToLines,
  cleanCommentsAndRemoveBlankLines,
  linesToArray,
} from './utils/line-parser'
import { leftPad } from './utils/string'
import { SymbolTable } from './utils/types'

export const assembleCInstruction: (value: string) => string = R.pipe(
  parseCInstruction,
  convertCInstructionToBinary,
)

const lookupSymbolFromTable = R.curry(
  (symbolTable: SymbolTable, symbol: string) =>
    R.prop(R.__, symbolTable)(symbol),
)

const leftPad16 = leftPad(16)

export const assembleSymbol = R.curry(
  (symbolTable: SymbolTable, symbol: string) =>
    R.pipe(
      lookupSymbolFromTable(symbolTable),
      decimalToBinaryString,
      leftPad16,
    )(symbol),
)

const isAInstructionOrExistsInSymbolTable = R.curry(
  (symbolTable: SymbolTable, instruction: string) =>
    R.anyPass([isAInstruction, R.has(R.__, symbolTable)])(instruction),
)

export const convertInstruction = R.curry(
  (symbolTable: SymbolTable, instruction: string) =>
    R.pipe(
      R.ifElse(
        isAInstructionOrExistsInSymbolTable(symbolTable),
        R.ifElse(
          isAInstruction,
          convertAInstructionToBinary,
          assembleSymbol(symbolTable),
        ),
        assembleCInstruction,
      ),
    )(instruction),
)

const notLabel = R.complement(R.test(labelRegex))
const stripLabels = R.filter(notLabel)
const addNewLine = R.concat(R.__, '\n')
const stripLabelsAndBuildSymbolsTable = R.pipe(
  R.juxt([stripLabels, buildSymbolsTable]),
  R.zipObj(['instructions', 'symbolTable']),
)
export const assemble: (input: string) => string = R.pipe(
  cleanCommentsAndRemoveBlankLines,
  linesToArray,
  stripLabelsAndBuildSymbolsTable,
  (data: { instructions: string[]; symbolTable: SymbolTable }) =>
    data.instructions.map((instruction: string) =>
      convertInstruction(data.symbolTable, instruction),
    ),
  arrayToLines,
  addNewLine,
)
