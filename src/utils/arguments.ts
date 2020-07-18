import path from 'path'
import R from 'ramda'
import { FileArguments } from './types'

const createHackOutputFileNameFromInput = (file: string): string =>
  path.join(
    path.dirname(file),
    path.basename(file, path.extname(file)) + '.hack',
  )

const createInputAndOutputArgumentsFromFirstArgument = R.chain(
  R.append,
  R.pipe(R.head, createHackOutputFileNameFromInput),
)

const createOutputObject = R.zipObj(['inputFile', 'outputFile'])

export const secondArgumentNotSupplied: (
  inputArguments: string[],
) => boolean = R.pipe(R.length, R.gt(2))

export const parseInputArguments: (
  inputArguments: string[],
) => FileArguments = R.pipe(
  R.take(2),
  R.ifElse(
    secondArgumentNotSupplied,
    createInputAndOutputArgumentsFromFirstArgument,
    R.identity,
  ),
  createOutputObject,
)
