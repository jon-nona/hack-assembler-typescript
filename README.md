# Hack Typescript Assembler <!-- omit in toc -->

Assembler for the Hack Language written in Typescript.

## Table of Contents <!-- omit in toc -->

**[⬆ back to top](#table-of-contents)**

### Available Commands

To see a list of available commands run:

```bash
npm run help
```

## Quick Start

1. go through all the Prerequisites in [Prerequisites](docs/prerequisites.md)
2. `npm i` install NPM dependencies
3. `npm run build:binaries` build the project binaries (output is in the bin folder).
4. if you are on MacOS or linux make the relevant binary executable.
5. `./bin/hack-assembler-typescript-macos -i <path-to-your-input-assembly-file>` to run the assembler and output a hack file. Optionally add a custom output file with `npm run assemble -- -i <path-to-your-input-assembly-file> -o <path-to-your-ouput-file>`
   1. An example of this could be `./bin/hack-assembler-typescript-macos -i ./hack-samples/Add.asm -o ~/Desktop/Add.hack`
