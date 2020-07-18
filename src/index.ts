import chalk from 'chalk'
import * as fs from 'fs'
import { bindNodeCallback, Observable, of } from 'rxjs'
import { flatMap, map, tap } from 'rxjs/operators'
import yargs from 'yargs'
import { parseInputArguments } from './utils/arguments'
import { cleanCommentsAndRemoveBlankLines } from './utils/line-parser'

export const readFile$ = bindNodeCallback(fs.readFile)
export const writeFile$ = bindNodeCallback(fs.writeFile)
export const accessFile$ = bindNodeCallback(fs.access)

const boldStatusMessage = chalk.bold.white
const errorMessage = chalk.bold.red
const infoMessage = chalk.white

const args = yargs.options({
  input: { type: 'string', demandOption: true, alias: 'i' },
  output: { type: 'string', demandOption: false, alias: 'o' },
}).argv

let argumentsAsArray = [args.input]
if (args.output) {
  argumentsAsArray = [...argumentsAsArray, args.output]
}

of(argumentsAsArray)
  .pipe(
    tap(() =>
      console.log(
        boldStatusMessage(
          'Welcome to the Typescript Hack Assembler ... starting up ...\n',
        ),
      ),
    ),
    map(parseInputArguments),
    tap((parsedArguments) =>
      console.log(
        infoMessage(`Checking file exists ... ${parsedArguments.inputFile}`),
      ),
    ),
    flatMap(
      (parsedArguments): Observable<string> =>
        accessFile$(parsedArguments.inputFile).pipe(
          tap(() => {
            console.log(infoMessage(`File Exists`))
            console.log(
              infoMessage(`Reading file from ${parsedArguments.inputFile}`),
            )
          }),
          flatMap(() => readFile$(parsedArguments.inputFile)),
          tap(() =>
            console.log(
              infoMessage(`Writing file to ${parsedArguments.outputFile}`),
            ),
          ),
          flatMap(
            (buffer: Buffer): Observable<string> =>
              of(cleanCommentsAndRemoveBlankLines(buffer.toString())),
          ),
          flatMap((output: string) =>
            writeFile$(parsedArguments.outputFile, output).pipe(
              map(
                () =>
                  `Success ... Output written to ${parsedArguments.outputFile}`,
              ),
            ),
          ),
        ),
    ),
  )
  .subscribe(
    (output) => console.log(boldStatusMessage(`\n${output}`)),
    (error) => console.error(errorMessage(error)),
  )
