import * as SUT from './arguments'

describe('arguments', () => {
  describe('parseInputArguments', () => {
    it('should return an object with the input and output file names, being the first two values in the array', () => {
      // given ... we have an array of arguments
      const inputArguments = ['test', 'test2']
      // when ... we call our method
      const result = SUT.parseInputArguments(inputArguments)
      // then ... it should return the result as expected
      expect(result).toEqual({
        inputFile: 'test',
        outPutFile: 'test2',
      })
    })

    it('should return an output file with the same path and the extension .hack if the output file is not supplied', () => {
      // given ... we have an array of arguments
      const inputArguments = [
        '/Users/jonathanarnold/Desktop/Learning Day/hack-assembler-typescript/test.asm',
      ]
      // when ... we call our method
      const result = SUT.parseInputArguments(inputArguments)
      // then ... it should return the result as expected
      expect(result).toEqual({
        inputFile:
          '/Users/jonathanarnold/Desktop/Learning Day/hack-assembler-typescript/test.asm',
        outPutFile:
          '/Users/jonathanarnold/Desktop/Learning Day/hack-assembler-typescript/test.hack',
      })
    })

    it('should return an output file with the same file name if a full path is not supplied', () => {
      // given ... we have an array of arguments
      const inputArguments = ['test.asm']
      // when ... we call our method
      const result = SUT.parseInputArguments(inputArguments)
      // then ... it should return the result as expected
      expect(result).toEqual({
        inputFile: 'test.asm',
        outPutFile: 'test.hack',
      })
    })
  })

  describe('secondArgumentNotSupplied', () => {
    it('should return true if the array supplied is less than 2 in length', () => {
      // given ... we have an array with one item
      const values = ['one']
      // when ... we call our method
      const result = SUT.secondArgumentNotSupplied(values)
      // then ... it should return the result as expected
      expect(result).toBe(true)
    })

    it('should return true if the array supplied is 2 or more in length', () => {
      // given ... we have an array with more than one item
      const values = ['one', 'two']
      // when ... we call our method
      const result = SUT.secondArgumentNotSupplied(values)
      // then ... it should return the result as expected
      expect(result).toBe(false)
    })
  })
})
