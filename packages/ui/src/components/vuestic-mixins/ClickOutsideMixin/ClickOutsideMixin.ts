// Most of the mixin's code was taken from:
// 1/ https://github.com/react-bootstrap/react-overlays/blob/master/src/useRootClose.ts
// 2/ https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ClickAwayListener/ClickAwayListener.js

import noop from 'lodash/noop'
import { Vue } from 'vue-class-component'

import {
  ownerDocument,
  listen,
  clickedRootScrollbar,
} from '../../../utils/dom-utils'
import { handleMouseCapture } from './ClickOutsideMixin-utils'

export type ClickOutsideOptions = {
  disabled: boolean;
  trigger: 'click' | 'mousedown' | 'mouseup';
  onClickOutside: (e: Event | undefined) => void;
}

class ClickOutsideMixin extends Vue {
  // Set it `true` to prevent handling a bubbled event
  // before handling a captured one for the first time
  private preventMouseRootTrigger = true

  handleMouse (e: MouseEvent, options: ClickOutsideOptions) {
    if (!this.preventMouseRootTrigger) {
      const { onClickOutside } = options
      onClickOutside(e)
    }
  }

  handleMouseCapture (e: MouseEvent, target: Element) {
    // Behave like a blur listener.
    if (clickedRootScrollbar(e)) {
      return
    }

    this.preventMouseRootTrigger = handleMouseCapture(e as MouseEvent, target)
  }

  registerClickOutsideEvents (
    target: Element | undefined,
    options: ClickOutsideOptions,
  ) {
    const { trigger, disabled } = options

    if (disabled || !target) {
      return noop
    }

    const document = ownerDocument(target as Element)

    // Use capture for this listener so it fires before Vue's listener, to
    // avoid false positives in the contains() check below if the target DOM
    // element is removed in the Vue mouse callback.
    const removeMouseCaptureListener = listen({
      node: document,
      eventName: trigger,
      handler: (e) => this.handleMouseCapture(e as MouseEvent, target),
      options: true,
    })

    const removeMouseListener = listen({
      node: document,
      eventName: trigger,
      handler: (e) => this.handleMouse(e as MouseEvent, options),
    })

    // Not sure if this is needed
    // Should make clickable all the elements on body
    // https://bugs.webkit.org/show_bug.cgi?id=153887
    let mobileSafariHackListeners: any[] = []
    if ('ontouchstart' in document.documentElement) {
      mobileSafariHackListeners = [].slice
        .call(document.body.children)
        .map((el) =>
          listen({ node: el, eventName: 'mousemove', handler: noop }),
        )
    }

    return () => {
      removeMouseCaptureListener()
      removeMouseListener()
      mobileSafariHackListeners.forEach((remove) => remove())
      this.preventMouseRootTrigger = true
    }
  }
}

export default ClickOutsideMixin
