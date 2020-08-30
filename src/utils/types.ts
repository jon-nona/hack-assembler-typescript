export interface FileArguments {
  inputFile: string
  outputFile: string
}

export interface CInstructionValue {
  dest: string
  comp: string
  jump: string | null
}
