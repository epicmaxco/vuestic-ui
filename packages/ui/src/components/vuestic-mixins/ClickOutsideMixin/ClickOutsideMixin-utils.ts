// Most of the mixin's code was taken from:
// 1/ https://github.com/react-bootstrap/react-overlays/blob/master/src/useRootClose.ts
// 2/ https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ClickAwayListener/ClickAwayListener.js

import {
  ownerDocument,
  contains,
  isLeftClickEvent,
  isModifiedEvent,
} from '../../../utils/dom-utils'
import { __DEV__ } from '../../../utils/global-utils'

export const handleMouseCapture = (e: MouseEvent, target: Element): boolean => {
  if (__DEV__) {
    if (!target) {
      throw new Error(
        'ClickOutside captured a click event but does not have a target to compare it to.',
      )
    }
  }

  let insideDom

  // If not enough, can use https://github.com/DieterHolvoet/event-propagation-path/blob/master/propagationPath.js
  if (e.composedPath) {
    insideDom = e.composedPath().indexOf(target) > -1
  } else {
    const doc = ownerDocument(target)
    // TODO remove dead logic https://caniuse.com/#search=composedPath.
    // `doc.contains` works in modern browsers but isn't supported in IE 11:
    // https://github.com/timmywil/panzoom/issues/450
    // https://github.com/videojs/video.js/pull/5872
    insideDom =
      !(
        doc.documentElement && doc.documentElement.contains(e.target as Node)
      ) || contains(target, e.target as Element)
  }

  return !!(!target || isModifiedEvent(e) || !isLeftClickEvent(e) || insideDom)
}
