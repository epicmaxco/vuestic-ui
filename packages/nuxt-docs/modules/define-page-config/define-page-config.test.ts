import { describe, it, expect } from 'vitest'
import { addPathToDefinePageConfig, removeDefinePageConfig } from './module'

const inputCode = `
export default definePageConfig({
  meta: {
    title: 'Hello',
    category: 'component'
  },

  setup() {
    return []
  }
})`

describe('define-page-config', () => {
  it('should add path config to page config', () => {
    expect(addPathToDefinePageConfig(inputCode, 'test')).toMatch(/definePageConfig\({ path: 'test'/)
    expect(addPathToDefinePageConfig(inputCode, '/home/user/vuestic')).toMatch(/definePageConfig\({ path: '\/home\/user\/vuestic'/)
  })

  it('should remove definePageConfig method', () => {
    expect(removeDefinePageConfig(inputCode).trim().startsWith('export default {')).toBeTruthy()
    expect(removeDefinePageConfig(inputCode).endsWith('}')).toBeTruthy()
  })
})