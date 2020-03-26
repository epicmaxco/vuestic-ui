import VaDivider from './VaDivider'
import { testIsContextableComponent } from '../../context-test/context-provide/testIsContextableComponent'

describe('VaDivider', () => {
  it('should throw if prop tag does not exist in the context', () => {
    const props = {
      tag: 'a',
    }
    expect(() => testIsContextableComponent(VaDivider, props)).toThrow()
  })
  it('is contextable', () => {
    const props = {
      vertical: false,
      dashed: false,
      inset: false,
      orientation: 'left',
    }
    expect(() => testIsContextableComponent(VaDivider, props)).not.toThrow()
  })
})
