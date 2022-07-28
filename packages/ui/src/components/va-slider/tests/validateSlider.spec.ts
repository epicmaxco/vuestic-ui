import { validateSlider } from '../validateSlider'
import { describe, it, expect } from 'vitest'

describe('slider', () => {
  it('slider right value', () => {
    expect(validateSlider(90, 1, 0, 100)).toEqual(true)
  })
  it('range right page', () => {
    expect(validateSlider([120, 180], 1, 100, 200)).toEqual(true)
  })
})
