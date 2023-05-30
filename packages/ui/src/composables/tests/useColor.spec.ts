import { describe, it, expect } from 'vitest'

describe('applyPreset function', () => {
  it.todo(
    'Given a preset name that exists, the current preset name is changed to the given preset name',
  )
  it.todo(
    'Given a non-existing preset name, the current preset name is not changed',
  )
  it.todo('Given a non-existing preset name, the warn function is called once')
})

describe('currentPresetName computed', () => {
  it.todo("Given that the currentPresetName property in the global config is 'foo', the currentPresetName computed returns 'foo'")
  it.todo("Given that the currentPresetName computed is assigned a value, the 'applyPreset' function is called once with the given value")
})
