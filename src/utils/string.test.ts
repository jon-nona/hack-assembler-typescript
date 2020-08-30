import * as SUT from './string'

describe('string', () => {
  describe('leftPad', () => {
    it('pads a string with zeroes to the left up to the specified length', () => {
      // given ... we have a string
      const testString = '11111111'
      // when ... we call our method
      const result = SUT.leftPad(16, testString)
      // then ... it should return the result as expected
      expect(result).toEqual('0000000011111111')
    })
  })
})
