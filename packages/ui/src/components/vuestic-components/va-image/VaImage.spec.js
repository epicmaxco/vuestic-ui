import VaImage from './VaImage'
import { testIsContextableComponent } from '../../context-test/context-provide/testIsContextableComponent'

describe('VaImage', () => {
  it('is contextable', () => {
    const componentProps = {
      src: 'https://picsum.photos/510/300?random',
    }
    const props = {
      ratio: 4 / 3,
      contain: true,
    }
    expect(() => testIsContextableComponent(VaImage, props, componentProps)).not.toThrow()
  })
})
