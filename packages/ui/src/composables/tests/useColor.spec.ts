import { describe, it, expect, vi } from 'vitest'
import { useColors } from '../useColors'
import { useGlobalConfig } from '../useGlobalConfig'
import { createTestComposable } from './createTestComposable'
import { warn } from '../../utils/console'

describe('applyPreset function', () => {
  it(
    'Given a non-existing preset name, the current preset name is changed and the warn function is called once',
    () => {
      const {
        composableWrapper: { applyPreset, globalConfig },
      } = createTestComposable([useColors, useGlobalConfig])

      vi.mock('../../utils/console', () => ({
        warn: vi.fn(),
      }))

      // Since this test's goal is to trigger a warning
      // by passing the wrong value to a function, we mock
      // useReactiveComputed to prevent it from throwing an unwanted error
      vi.mock('../useReactiveComputed', () => ({
        useReactiveComputed: vi.fn(),
      }))
      applyPreset('foo')
      expect(globalConfig.value.colors.currentPresetName).toBe('foo')
      expect(warn).toHaveBeenCalledTimes(1)
      vi.doUnmock('../useReactiveComputed')
    },
  )
  it(
    'Given a preset name that exists, the current preset name is changed to the given preset name',
    () => {
      const {
        composableWrapper: { applyPreset, globalConfig },
      } = createTestComposable([useColors, useGlobalConfig])

      applyPreset('dark')
      expect(globalConfig.value.colors.currentPresetName).toBe('dark')
    },
  )
})

describe('currentPresetName computed', () => {
  it.todo("Given that the currentPresetName property in the global config is 'foo', the currentPresetName computed returns 'foo'")
  it.todo("Given that the currentPresetName computed is assigned a value, the 'applyPreset' function is called once with the given value")
})
