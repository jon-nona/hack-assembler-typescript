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
          const result = SUT.destTable[value as any]
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
          const result = SUT.jumpTable[value as any]
          // then ... we should get the result as expected
          expect(result).toEqual(expected)
        })
      },
    )
  })

  describe('predefinedSymbolsTable', () => {
    parametrize(
      [
        ['should return 0 when the value is R0', 'R0', 0],
        ['should return 1 when the value is R1', 'R1', 1],
        ['should return 2 when the value is R1', 'R2', 2],
        ['should return 3 when the value is R3', 'R3', 3],
        ['should return 4 when the value is R4', 'R4', 4],
        ['should return 5 when the value is R5', 'R5', 5],
        ['should return 6 when the value is R6', 'R6', 6],
        ['should return 7 when the value is R7', 'R7', 7],
        ['should return 8 when the value is R8', 'R8', 8],
        ['should return 9 when the value is R9', 'R9', 9],
        ['should return 10 when the value is R10', 'R10', 10],
        ['should return 11 when the value is R11', 'R11', 11],
        ['should return 12 when the value is R12', 'R12', 12],
        ['should return 13 when the value is R13', 'R13', 13],
        ['should return 14 when the value is R14', 'R14', 14],
        ['should return 15 when the value is R15', 'R15', 15],
        ['should return 0 when the value is SP', 'SP', 0],
        ['should return 1 when the value is LCL', 'LCL', 1],
        ['should return 2 when the value is ARG', 'ARG', 2],
        ['should return 3 when the value is THIS', 'THIS', 3],
        ['should return 4 when the value is THAT', 'THAT', 4],
        ['should return 16384 when the value is SCREEN', 'SCREEN', 16384],
        ['should return 24576 when the value is KBD', 'KBD', 24576],
      ],
      (description: string, value: string, expected: string) => {
        it(description, () => {
          // given ... we have a value
          // when ... we look it up in our table.
          const result = SUT.predefinedSymbolsTable[value as any]
          // then ... we should get the result as expected
          expect(result).toEqual(expected)
        })
      },
    )
  })

  describe('compTable', () => {
    parametrize(
      [
        ['should return 101010 when the value is 0', '0', '101010'],
        ['should return 111111 when the value is 0', '1', '111111'],
        ['should return 111010 when the value is 0', '-1', '111010'],
        ['should return 001100 when the value is D', 'D', '001100'],
        ['should return 110000 when the value is A', 'A', '110000'],
        ['should return 110000 when the value is M', 'M', '110000'],
        ['should return 001101 when the value is !D', '!D', '001101'],
        ['should return 110001 when the value is !A', '!A', '110001'],
        ['should return 110001 when the value is !M', '!M', '110001'],
        ['should return 001111 when the value is -D', '-D', '001111'],
        ['should return 110011 when the value is -A', '-A', '110011'],
        ['should return 110011 when the value is -M', '-M', '110011'],
        ['should return 011111 when the value is D+1', 'D+1', '011111'],
        ['should return 110111 when the value is A+1', 'A+1', '110111'],
        ['should return 110111 when the value is M+1', 'M+1', '110111'],
        ['should return 001110 when the value is D-1', 'D-1', '001110'],
        ['should return 110010 when the value is A-1', 'A-1', '110010'],
        ['should return 110010 when the value is M-1', 'M-1', '110010'],
        ['should return 000010 when the value is D+A', 'D+A', '000010'],
        ['should return 000010 when the value is D+M', 'D+M', '000010'],
        ['should return 010011 when the value is D-A', 'D-A', '010011'],
        ['should return 010011 when the value is D-M', 'D-M', '010011'],
        ['should return 000111 when the value is A-D', 'A-D', '000111'],
        ['should return 000111 when the value is M-D', 'M-D', '000111'],
        ['should return 000000 when the value is D&A', 'D&A', '000000'],
        ['should return 000000 when the value is A&D', 'A&D', '000000'],
        ['should return 000000 when the value is D&M', 'D&M', '000000'],
        ['should return 000000 when the value is M&D', 'M&D', '000000'],
        ['should return 010101 when the value is D|A', 'D|A', '010101'],
        ['should return 010101 when the value is A|D', 'A|D', '010101'],
        ['should return 010101 when the value is M|D', 'M|D', '010101'],
        ['should return 010101 when the value is D|M', 'D|M', '010101'],
      ],
      (description: string, value: string, expected: string) => {
        it(description, () => {
          // given ... we have a value
          // when ... we look it up in our table.
          const result = SUT.compTable[value as any]
          // then ... we should get the result as expected
          expect(result).toEqual(expected)
        })
      },
    )
  })
})
