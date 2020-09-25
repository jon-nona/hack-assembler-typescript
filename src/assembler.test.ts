import * as SUT from './assembler'
import parametrize from 'js-parametrize'
import { SymbolTable } from './utils/types'
import * as fs from 'fs'
import * as path from 'path'

describe('assembler', () => {
  describe('assembleCInstruction', () => {
    it('should convert a c instruction to binary', () => {
      // given ... we have a valid c instruction
      const instruction = 'D=M'
      // when ... we call our function
      const result = SUT.assembleCInstruction(instruction)
      // then ... it should return the value as expected
      expect(result).toEqual('1111110000010000')
    })
  })

  describe('assembleSymbol', () => {
    it('should lookup a symbol in the supplied symbol table and convert it to binary', () => {
      // given ... we have a valid symbol
      const symbol = 'LABEL'
      // ... we have a symbol table with this value in it
      const symbolTable = {
        LABEL: 16,
      }
      // when ... we call our function
      const result = SUT.assembleSymbol(symbolTable, symbol)

      // then ... it should return the value as expected
      expect(result).toEqual('0000000000010000')
    })
  })

  describe('convertInstruction', () => {
    parametrize(
      [
        [
          'should convert a c instruction to hack binary',
          {},
          'D=M',
          '1111110000010000',
        ],
        [
          'should convert an a instruction to hack binary',
          {},
          '@16',
          '0000000000010000',
        ],
        [
          'should convert a variable symbol to hack binary',
          { '@FOO': 20 },
          '@FOO',
          '0000000000010100',
        ],
        [
          'should convert a label symbol to hack binary',
          { LABEL: 32 },
          'LABEL',
          '0000000000100000',
        ],
      ],
      (
        description: string,
        symbols: SymbolTable,
        instruction: string,
        expected: string,
      ) => {
        it(description, () => {
          // given ... we have a valid instruction and a symbol table
          // when ... we call our function
          const result = SUT.convertInstruction(symbols, instruction)
          // then ... it should return the value as expected
          expect(result).toEqual(expected)
        })
      },
    )
  })

  describe('assemble', () => {
    parametrize(
      [
        [
          'should convert a basic hack program to the expected binary',
          'Fill.asm',
          'Fill.hack',
        ],
      ],
      (
        description: string,
        inputAssemblyFileName: string,
        expectedHackFileName: string,
      ) => {
        it(description, () => {
          // given ... we have a hack assembly file and we load it
          const inputFileAsString = fs
            .readFileSync(
              path.join(__dirname, '..', 'hack-samples', inputAssemblyFileName),
            )
            .toString()
          const outputFileAsString = fs
            .readFileSync(
              path.join(__dirname, '..', 'hack-samples', expectedHackFileName),
            )
            .toString()

          // when ... we call our function
          const result = SUT.assemble(inputFileAsString)
          // then ... it should return the value as expected
          expect(result).toEqual(outputFileAsString)
        })
      },
    )
  })
})
