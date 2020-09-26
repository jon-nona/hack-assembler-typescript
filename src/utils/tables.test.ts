import * as SUT from './tables'
import parametrize from 'js-parametrize'

describe('tables', () => {
  describe('destTable', () => {
    parametrize(
      [
        ['should return 001 when the value is M', 'M', '001'],
        ['should return 010 when the value is D', 'D', '010'],
        ['should return 011 when the value is MD', 'MD', '011'],
        ['should return 100 when the value is A', 'A', '100'],
        ['should return 101 when the value is AM', 'AM', '101'],
        ['should return 110 when the value is AD', 'AD', '110'],
        ['should return 111 when the value is AMD', 'AMD', '111'],
      ],
      (description: string, value: string, expected: string) => {
        it(description, () => {
          // given ... we have a value
          // when ... we look it up in our table.
          const result = SUT.destTable[value as keyof typeof SUT.destTable]
          // then ... we should get the result as expected
          expect(result).toEqual(expected)
        })
      },
    )
  })

  describe('jumpTable', () => {
    parametrize(
      [
        ['should return 001 when the value is JGT', 'JGT', '001'],
        ['should return 010 when the value is JEQ', 'JEQ', '010'],
        ['should return 011 when the value is JGE', 'JGE', '011'],
        ['should return 100 when the value is JLT', 'JLT', '100'],
        ['should return 101 when the value is JNE', 'JNE', '101'],
        ['should return 110 when the value is JLE', 'JLE', '110'],
        ['should return 111 when the value is JMP', 'JMP', '111'],
      ],
      (description: string, value: string, expected: string) => {
        it(description, () => {
          // given ... we have a value
          // when ... we look it up in our table.
          const result = SUT.jumpTable[value as keyof typeof SUT.jumpTable]
          // then ... we should get the result as expected
          expect(result).toEqual(expected)
        })
      },
    )
  })

  describe('predefinedSymbolsTable', () => {
    parametrize(
      [
        ['should return 0 when the value is R0', '@R0', 0],
        ['should return 1 when the value is @R2', '@R1', 1],
        ['should return 2 when the value is @R', '@R2', 2],
        ['should return 3 when the value is @R3', '@R3', 3],
        ['should return 4 when the value is @R4', '@R4', 4],
        ['should return 5 when the value is @R5', '@R5', 5],
        ['should return 6 when the value is @R6', '@R6', 6],
        ['should return 7 when the value is @R7', '@R7', 7],
        ['should return 8 when the value is @R8', '@R8', 8],
        ['should return 9 when the value is @R9', '@R9', 9],
        ['should return 10 when the value is @R10', '@R10', 10],
        ['should return 11 when the value is @R11', '@R11', 11],
        ['should return 12 when the value is @R12', '@R12', 12],
        ['should return 13 when the value is @R13', '@R13', 13],
        ['should return 14 when the value is @R14', '@R14', 14],
        ['should return 15 when the value is @R15', '@R15', 15],
        ['should return 0 when the value is @SP', '@SP', 0],
        ['should return 1 when the value is @LCL', '@LCL', 1],
        ['should return 2 when the value is @ARG', '@ARG', 2],
        ['should return 3 when the value is @THIS', '@THIS', 3],
        ['should return 4 when the value is @THAT', '@THAT', 4],
        ['should return 16384 when the value is @SCREEN', '@SCREEN', 16384],
        ['should return 24576 when the value is @KBD', '@KBD', 24576],
      ],
      (description: string, value: string, expected: string) => {
        it(description, () => {
          // given ... we have a value
          // when ... we look it up in our table.
          const result =
            SUT.predefinedSymbolsTable[
              value as keyof typeof SUT.predefinedSymbolsTable
            ]
          // then ... we should get the result as expected
          expect(result).toEqual(expected)
        })
      },
    )
  })

  describe('compTable', () => {
    parametrize(
      [
        ['should return 0101010 when the value is 0', '0', '0101010'],
        ['should return 0111111 when the value is 0', '1', '0111111'],
        ['should return 0111010 when the value is 0', '-1', '0111010'],
        ['should return 0001100 when the value is D', 'D', '0001100'],
        ['should return 0110000 when the value is A', 'A', '0110000'],
        ['should return 1110000 when the value is M', 'M', '1110000'],
        ['should return 0001101 when the value is !D', '!D', '0001101'],
        ['should return 0110001 when the value is !A', '!A', '0110001'],
        ['should return 1110001 when the value is !M', '!M', '1110001'],
        ['should return 0001111 when the value is -D', '-D', '0001111'],
        ['should return 0110011 when the value is -A', '-A', '0110011'],
        ['should return 1110011 when the value is -M', '-M', '1110011'],
        ['should return 0011111 when the value is D+1', 'D+1', '0011111'],
        ['should return 0110111 when the value is A+1', 'A+1', '0110111'],
        ['should return 1110111 when the value is M+1', 'M+1', '1110111'],
        ['should return 0001110 when the value is D-1', 'D-1', '0001110'],
        ['should return 0110010 when the value is A-1', 'A-1', '0110010'],
        ['should return 1110010 when the value is M-1', 'M-1', '1110010'],
        ['should return 0000010 when the value is D+A', 'D+A', '0000010'],
        ['should return 1000010 when the value is D+M', 'D+M', '1000010'],
        ['should return 0010011 when the value is D-A', 'D-A', '0010011'],
        ['should return 1010011 when the value is D-M', 'D-M', '1010011'],
        ['should return 0000111 when the value is A-D', 'A-D', '0000111'],
        ['should return 1000111 when the value is M-D', 'M-D', '1000111'],
        ['should return 0000000 when the value is D&A', 'D&A', '0000000'],
        ['should return 0000000 when the value is A&D', 'A&D', '0000000'],
        ['should return 1000000 when the value is D&M', 'D&M', '1000000'],
        ['should return 1000000 when the value is M&D', 'M&D', '1000000'],
        ['should return 0010101 when the value is D|A', 'D|A', '0010101'],
        ['should return 0010101 when the value is A|D', 'A|D', '0010101'],
        ['should return 1010101 when the value is M|D', 'M|D', '1010101'],
        ['should return 1010101 when the value is D|M', 'D|M', '1010101'],
      ],
      (description: string, value: string, expected: string) => {
        it(description, () => {
          // given ... we have a value
          // when ... we look it up in our table.
          const result = SUT.compTable[value as keyof typeof SUT.compTable]
          // then ... we should get the result as expected
          expect(result).toEqual(expected)
        })
      },
    )
  })
})
