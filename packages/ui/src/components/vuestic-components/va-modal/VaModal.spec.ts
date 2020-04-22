import noop from 'lodash/noop'
import VaModal from './VaModal.vue'

import { testHasStatefulMixin } from '../../vuestic-mixins/StatefullMixin/testHasStatefulMixin'
import { testIsContextableComponent } from '../../context-test/context-provide/testIsContextableComponent'
import { StatefulMixin } from '../../vuestic-mixins/StatefullMixin/StatefulMixin'

describe('VaModal', () => {
  describe('stateful mixin', () => {
    // Manually disable the vue props check here
    // because `testHasStatefulMixin` uses `value: string`
    // instead of `value: boolean`
    let logError: any
    beforeEach(() => {
      logError = console.error
      console.error = noop
    })

    afterEach(() => {
      console.error = logError
    })

    it('has StatefulMixin', () => {
      expect(() => testHasStatefulMixin((VaModal as unknown) as StatefulMixin)).not.toThrow()
    })
  })

  describe('contextable mixin', () => {
    it('should throw if prop tag does not exist in the context', () => {
      const props = {
        tag: 'a',
      }
      expect(() => testIsContextableComponent(VaModal, props)).toThrow()
    })
    it('is contextable', () => {
      const props = {
        value: false,
        position: 'center',
        title: '',
        message: '',
        okText: 'OK',
        cancelText: 'Cancel',
        hideDefaultActions: false,
        fullscreen: false,
        mobileFullscreen: true,
        noDismiss: false,
        noOutsideDismiss: false,
        noEscDismiss: false,
        maxWidth: '',
        maxHeight: '',
        size: 'medium',
        fixedLayout: false,
        withoutTransitions: false,
        overlay: true,
        overlayOpacity: undefined,
      }
      expect(() => testIsContextableComponent(VaModal, props)).not.toThrow()
    })
  })
})
