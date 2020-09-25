import R from 'ramda'
import {
  buildSymbolsTable,
  convertAInstructionToBinary,
  isAInstruction,
} from './utils/instruction-parser'
import {
  cleanCommentsAndRemoveBlankLines,
  linesToArray,
  arrayToLines,
} from './utils/line-parser'
import {
  isSymbolOrAInstruction,
  parseCInstruction,
  convertCInstructionToBinary,
  decimalToBinaryString,
} from './utils/instruction-parser'
import { SymbolTable } from './utils/types'
import { leftPad } from './utils/string'

export const assembleCInstruction: (value: string) => string = R.pipe(
  parseCInstruction,
  convertCInstructionToBinary,
)

export const assembleSymbol = R.curry(
  (symbolTable: SymbolTable, instruction: string) =>
    R.pipe(
      R.prop(R.__, symbolTable),
      decimalToBinaryString,
      leftPad(16),
    )(instruction),
)

export const convertInstruction = R.curry(
  (symbolTable: SymbolTable, instruction: string) =>
    R.pipe(
      R.ifElse(
        isSymbolOrAInstruction,
        R.ifElse(
          isAInstruction,
          convertAInstructionToBinary,
          assembleSymbol(symbolTable),
        ),
        assembleCInstruction,
      ),
    )(instruction),
)

export const assemble: (input: string) => string = R.pipe(
  cleanCommentsAndRemoveBlankLines,
  linesToArray,
  R.juxt([R.identity, buildSymbolsTable]),
  R.zipObj(['instructions', 'symbolTable']),
  (data: { instructions: string[]; symbolTable: SymbolTable }) =>
    data.instructions.map((instruction: string) =>
      convertInstruction(instruction, data.symbolTable),
    ),
  arrayToLines,
)
