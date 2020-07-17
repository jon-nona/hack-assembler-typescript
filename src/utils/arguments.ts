import R from 'ramda'
import path from 'path'

const createHackOutputFileNameFromInput = (file: string): string =>
  path.join(
    path.dirname(file),
    path.basename(file, path.extname(file)) + '.hack',
  )

const createInputAndOutputArgumentsFromFirstArgument = R.chain(
  R.append,
  R.pipe(R.head, createHackOutputFileNameFromInput),
)

const createOutputObject = R.zipObj(['inputFile', 'outPutFile'])

export const secondArgumentNotSupplied: (
  inputArguments: string[],
) => boolean = R.pipe(R.length, R.lt(R.__, 2))

export const parseInputArguments: (
  inputArguments: string[],
) => {
  inputFile: string
  outputFile: string
} = R.pipe(
  R.take(2),
  R.ifElse(
    secondArgumentNotSupplied,
    createInputAndOutputArgumentsFromFirstArgument,
    R.identity,
  ),
  createOutputObject,
)
