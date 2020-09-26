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

export const assembleSymbol = R.curry(
  (symbolTable: SymbolTable, symbol: string) =>
    R.pipe(
      R.prop(R.__, symbolTable),
      decimalToBinaryString,
      leftPad(16),
    )(symbol),
)

export const convertInstruction = R.curry(
  (symbolTable: SymbolTable, instruction: string) =>
    R.pipe(
      R.ifElse(
        R.anyPass([isAInstruction, R.has(R.__, symbolTable)]),
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
export const assemble: (input: string) => string = R.pipe(
  cleanCommentsAndRemoveBlankLines,
  linesToArray,
  R.juxt([stripLabels, buildSymbolsTable]),
  R.zipObj(['instructions', 'symbolTable']),
  (data: { instructions: string[]; symbolTable: SymbolTable }) =>
    data.instructions.map((instruction: string) =>
      convertInstruction(data.symbolTable, instruction),
    ),
  arrayToLines,
  R.concat(R.__, '\n'), // add a new line at the end of the file
)
