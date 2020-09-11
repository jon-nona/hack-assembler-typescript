import * as SUT from './instruction-parser'
import parametrize from 'js-parametrize'
import { CInstructionValue } from './types'

describe('instruction parser', () => {
  describe('isAintruction', () => {
    parametrize(
      [
        [
          '@24',
          'it should return true if the instruction is an a instruction',
          true,
        ],
        [
          'M=24',
          'it should return true if the instruction not an a instruction',
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

  describe('convertCInstructionToBinarWithoutABit', () => {
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
})
