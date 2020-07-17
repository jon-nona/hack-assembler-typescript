import * as SUT from './index'

describe('Example Test', () => {
  it('should have a test which passes', () => {
    // given ... nothing
    // when ... we call our example
    const result = SUT.example()
    // then ... it should return true
    expect(result).toBe(true)
  })
})
