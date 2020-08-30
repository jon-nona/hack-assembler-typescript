import * as SUT from './instruction-parser'
import parametrize from 'js-parametrize'

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
})
