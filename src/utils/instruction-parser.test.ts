import * as SUT from './instruction-parser'
import parametrize from 'js-parametrize'
import { CInstructionValue } from './types'
import { predefinedSymbolsTable } from './tables'

describe('instruction parser', () => {
  describe('isAinstruction', () => {
    parametrize(
      [
        [
          '@24',
          'it should return true if the instruction is an A instruction',
          true,
        ],
        [
          'M=24',
          'it should return false if the instruction not an A instruction',
          false,
        ],
        [
          '@foo',
          'it should return false if the instruction is a symbol',
          false,
        ],
        [
          '@FOO',
          'it should return false if the instruction is a symbol',
          false,
        ],
      ],
      (instruction: string, description: string, expected: boolean) => {
        it(description, () => {
          // given ... we have an instruction
          // when ... we call our function with this instruction
          const result = SUT.isAInstruction(instruction)
          // then ... it should return the result as expected.
          expect(result).toBe(expected)
        })
      },
    )
  })

  describe('isVariableSymbol', () => {
    parametrize(
      [
        [
          '@FOO',
          'it should return true if the symbol is a variable and is not in predefined symbols',
          true,
        ],
        [
          '@SCREEN',
          'it should return false if the symbol is in predefined symbols',
          false,
        ],
      ],
      (symbol: string, description: string, expected: boolean) => {
        it(description, () => {
          // given ... we have an instruction
          // when ... we call our function with this symbol
          const result = SUT.isVariableSymbol(symbol)
          // then ... it should return the result as expected.
          expect(result).toBe(expected)
        })
      },
    )
  })

  describe('isSymbolOrAInstruction', () => {
    parametrize(
      [
        [
          '@24',
          'it should return true if the instruction is an A instruction',
          true,
        ],
        [
          'M=24',
          'it should return false if the instruction not an A instruction, variable symbol or label symbol',
          false,
        ],
        [
          '@foo',
          'it should return false if the instruction is a variable symbol',
          true,
        ],
        [
          'LOOP',
          'it should return true if the instruction is a label symbol',
          true,
        ],
      ],
      (instruction: string, description: string, expected: boolean) => {
        it(description, () => {
          // given ... we have an instruction
          // when ... we call our function with this instruction
          const result = SUT.isVariableOrLabelSymbolOrAInstruction(instruction)
          // then ... it should return the result as expected.
          expect(result).toBe(expected)
        })
      },
    )
  })

  describe('convertAInstructionToBinary', () => {
    it('should convert an a instruction to the correct binary code', () => {
      // given ... we have an a instruction
      const aInststruction = '@21'
      // when ... we call our method
      const result = SUT.convertAInstructionToBinary(aInststruction)
      // then ... it should return the result as expected
      expect(result).toEqual('0000000000010101')
    })
  })

  describe('parseCInstruction', () => {
    parametrize(
      [
        [
          'M=1;JGT',
          {
            dest: 'M',
            comp: '1',
            jump: 'JGT',
          },
        ],
        [
          'M=1',
          {
            dest: 'M',
            comp: '1',
          },
        ],
        [
          'M=D',
          {
            dest: 'M',
            comp: 'D',
          },
        ],
        [
          'M=M+D',
          {
            dest: 'M',
            comp: 'M+D',
          },
        ],
        [
          'D=M-1',
          {
            dest: 'D',
            comp: 'M-1',
          },
        ],
        [
          'D;JEQ',
          {
            comp: 'D',
            jump: 'JEQ',
          },
        ],
        [
          '0;JMP',
          {
            comp: '0',
            jump: 'JMP',
          },
        ],
      ],
      (instruction: string, expected: CInstructionValue) => {
        it('should parse a c instruction', () => {
          // given ... we have a c instruction
          // when ... we call our function
          const result = SUT.parseCInstruction(instruction)
          // then ... it should return the result as expected
          expect(result).toEqual(expected)
        })
      },
    )
  })

  describe('isLabelSymbol', () => {
    parametrize(
      [
        [
          'it should return true when the value is a valid label symbol',
          '(LABEL)',
          true,
        ],
        [
          'it should return false when the value is not a valid label symbol',
          '@21',
          false,
        ],
        [
          'it should return false when the value is not a valid label symbol',
          '(Label',
          false,
        ],
      ],
      (description: string, value: string, expected: boolean) => {
        it(description, () => {
          // given ... we have a potential label symbol
          // when ...  we call our function
          const result = SUT.isLabelSymbol(value)
          // then ... it should return the result as expected
          expect(result).toEqual(expected)
        })
      },
    )
  })

  describe('convertCInstructionToBinary', () => {
    parametrize(
      [
        [
          {
            dest: 'MD',
            comp: 'D+1',
          },
          '1110011111011000',
        ],
        [
          {
            dest: 'D',
            comp: 'M',
          },
          '1111110000010000',
        ],
        [
          {
            dest: 'M',
            comp: 'M+D',
          },
          '1111000010001000',
        ],
        [
          {
            comp: 'D',
            jump: 'JGT',
          },
          '1110001100000001',
        ],
      ],
      (cInstructionValue: CInstructionValue, expected: string) => {
        it('should convert the CInstruction to binary', () => {
          // given ... we have a CInstructionValue object
          // when ... we call our function
          const result = SUT.convertCInstructionToBinary(cInstructionValue)
          // then ... it should return the value as expected
          expect(result).toEqual(expected)
        })
      },
    )
  })

  describe('buildLabelSymbolTable', () => {
    it('should build a label symbols table with a lookup value for each symbol that is encountered', () => {
      // given ... we have instructions as an array
      const instructions = [
        '(SYMBOL)',
        'M=24',
        '(LOOP)',
        '@24',
        'M=20',
        '(JON)',
        '@24',
      ]
      // when ... we call our function
      const result = SUT.buildLabelSymbolTable(instructions)
      // then ... it should return the result as expected
      expect(result).toEqual({ SYMBOL: 0, LOOP: 1, JON: 3 })
    })
  })

  describe('buildVariableSymbolsTable', () => {
    it('should build a variable symbols table with a lookup value for each symbol that is encountered', () => {
      // given ... we have instructions as an array
      const instructions = [
        '(SYMBOL)',
        'M=24',
        '(LOOP)',
        '@24',
        'M=20',
        '(JON)',
        '@24',
        '@foo',
        '@bar',
      ]
      // when ... we call our function
      const result = SUT.buildVariableSymbolsTable(instructions)
      // then ... it should return the result as expected
      expect(result).toEqual({ '@foo': 16, '@bar': 17 })
    })
  })

  describe('buildSymbolsTable', () => {
    it('should build a symbols table with all variables, labels and predefined symbols contained in it', () => {
      // given ... we have instructions as an array
      const instructions = [
        '(SYMBOL)',
        'M=24',
        '(LOOP)',
        '@24',
        'M=20',
        '(JON)',
        '@24',
        '@foo',
        '@bar',
      ]
      // when ... we call our function
      const result = SUT.buildSymbolsTable(instructions)
      // then ... it should return the result as expected
      expect(result).toEqual({
        '@foo': 16,
        '@bar': 17,
        'SYMBOL': 0,
        'LOOP': 1,
        'JON': 3,
        ...predefinedSymbolsTable,
      })
    })
  })
})
