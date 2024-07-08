import { describe, it, expect } from 'vitest'
import { getWords } from './text-case'

describe('textCase', () => {
  it('should return the correct text case', () => {
    expect(getWords('neutral1')).toEqual(['neutral', '1'])
    expect(getWords('backgroundPrimary')).toEqual(['background', 'Primary'])
    expect(getWords('background-primary')).toEqual(['background', 'primary'])
    expect(getWords('background_primary')).toEqual(['background', 'primary'])
    expect(getWords('background Primary')).toEqual(['background', 'Primary'])
    expect(getWords('background primary')).toEqual(['background', 'primary'])
    expect(getWords('background_primary12')).toEqual(['background', 'primary', '12'])
  })
})
