import { validateSlider } from '../validateSlider'
import { describe, it, expect, vi } from 'vitest'

describe('slider', () => {
  vi.mock('../../../utils/console')
  it('slider right value', () => {
    expect(validateSlider(90, 1, 0, 100, true)).toEqual(true)
  })
  it('range right page', () => {
    expect(validateSlider([120, 180], 1, 100, 200, true)).toEqual(true)
  })
  it('should warn if array passed without range flag', async () => {
    const { warn } = await import('../../../utils/console')
    validateSlider([120, 180], 1, 100, 200, false)
    expect(warn).toHaveBeenLastCalledWith(
      'The type "array" of prop "model-value" does not match prop "range = false".',
    )
  })

  it('should warn if one value passed with range flag', async () => {
    const { warn } = await import('../../../utils/console')
    validateSlider(150, 1, 100, 200, true)
    expect(warn).toHaveBeenLastCalledWith(
      'The type "number" of prop "model-value" does not match prop "range = true".',
    )
  })
})
