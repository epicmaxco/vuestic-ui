import { generateUniqueId } from '../uuid'
import { describe, it, expect } from 'vitest'

describe('uuid', () => {
  it('generateUuid', () => {
    const uuid = generateUniqueId()

    expect(uuid).toHaveLength(18)
    expect(typeof uuid).toBe('string')

    const uuid2 = generateUniqueId()

    expect(uuid2).toHaveLength(18)
    expect(typeof uuid2).toBe('string')

    expect(uuid2).not.toEqual(uuid)
  })
})
