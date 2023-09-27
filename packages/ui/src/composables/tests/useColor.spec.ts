import { describe, it, expect, vi } from 'vitest'
import { useColors } from '../useColors'
import { useGlobalConfig } from '../useGlobalConfig'
import { createTestComposable } from './createTestComposable'
import { warn } from '../../utils/console'

describe('applyPreset function', () => {
  const {
    composableWrapper: { applyPreset, globalConfig },
  } = createTestComposable([useColors, useGlobalConfig])
  vi.mock('../../utils/console', () => ({
    warn: vi.fn(),
  }))
  it(
    'Given a non-existing preset name, the current preset name is changed and the warn function is called once',
    () => {
      applyPreset('foo')
      expect(globalConfig.value.colors.currentPresetName).toBe('foo')
      expect(warn).toHaveBeenCalledTimes(1)
      vi.clearAllMocks()
    },
  )
  it(
    'Given a preset name that exists, the current preset name is changed to the given preset name and no warning is triggered',
    () => {
      applyPreset('dark')
      expect(globalConfig.value.colors.currentPresetName).toBe('dark')
      expect(warn).toHaveBeenCalledTimes(0)
    },
  )
})

describe('currentPresetName computed', () => {
  it('Given that the currentPresetName property in globalConfig has a value, the currentPresetName computed in useColors returns that same value', () => {
    const {
      composableWrapper: { currentPresetName, globalConfig },
    } = createTestComposable([useColors, useGlobalConfig])
    expect(currentPresetName.value).toBe(globalConfig.value.colors.currentPresetName)
  })
  it('Given that the currentPresetName computed is assigned a value, the the currentPresetName property in globalConfig gets the same value', () => {
    const {
      composableWrapper: { currentPresetName, globalConfig },
    } = createTestComposable([useColors, useGlobalConfig])
    currentPresetName.value = 'dark'
    expect(globalConfig.value.colors.currentPresetName).toBe('dark')
  })
})

describe('getColor("onColor")', () => {
  it('Given a color name, getColor("onColor") returns the corresponding color name with the "on" prefix', () => {
    const {
      composableWrapper: { getColor },
    } = createTestComposable([useColors])

    expect(getColor('onPrimary')).toBe('#FFFFFF')
    expect(getColor('onWarning')).toBe('#262824')
    expect(getColor('onNonExisting')).toBe('#154EC1') // Fallback to primary
    expect(getColor('onNonExisting', '#FF00FF')).toBe('#FF00FF')
  })
})

describe('getTextColor("onColor")', () => {
  it('Given a color name, getColor("onColor") returns the corresponding color name with the "on" prefix', () => {
    const {
      composableWrapper: { getTextColor },
    } = createTestComposable([useColors], {
      colors: {
        variables: {
          onPrimary: '#FF00FF',
        },
      },
    })

    expect(getTextColor('primary')).toBe('#FF00FF')
  })
})
