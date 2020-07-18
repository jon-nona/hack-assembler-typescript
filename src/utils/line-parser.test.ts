import * as SUT from './line-parser'

describe('line parser', () => {
  describe('removeEmpty', () => {
    it('should remove empty values from an array', () => {
      // given ... we have an array with some empty values
      const testArray: any = ['something', '', '', 'some other stuff']
      // when ... we call our method
      const result = SUT.removeEmpty(testArray)
      // then ... the result should be returned as expected
      expect(result).toEqual(['something', 'some other stuff'])
    })
  })

  describe('removeWhiteSpace', () => {
    it('should remove whitespace from strings in an array', () => {
      // given ... we have an array with some empty values
      const testArray: any = ['something ', 'some other stuff    ']
      // when ... we call our method
      const result = SUT.removeWhiteSpace(testArray)
      // then ... the result should be returned as expected
      expect(result).toEqual(['something', 'some other stuff'])
    })
  })

  describe('fromLines', () => {
    it('should join an array into a string with a new line for each item', () => {
      // given ... we have an array with some values
      const testArray: any = ['something', 'some other stuff']
      // when ... we call our method
      const result = SUT.fromLines(testArray)
      // then ... the result should be returned as expected
      expect(result).toEqual('something\nsome other stuff')
    })
  })

  describe('toLines', () => {
    it('should split a string into an array based on new lines', () => {
      // given ... we have a string with some new lines
      const testString = 'a string with\nnew lines'
      // when ... we call our method
      const result = SUT.toLines(testString)
      // then ... the result should be returned as expected
      expect(result).toEqual(['a string with', 'new lines'])
    })
  })

  describe('cleanCommentsAndRemoveBlankLines', () => {
    it('should remove all comments and blank lines from a strign', () => {
      // given ... we have a string with some new lines and comments and blank lines
      const testString = 'a string with\nnew lines\n\n// some comment'
      // when ... we call our method
      const result = SUT.cleanCommentsAndRemoveBlankLines(testString)
      // then ... the result should be returned as expected
      expect(result).toEqual('a string with\nnew lines')
    })
  })
})
