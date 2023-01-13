import type { Component, ExtractPropTypes } from 'vue'
import { h } from 'vue'

import { VaIcon } from '../components/'

export const useFallbackProps = {
  fallbackSrc: {
    type: String,
    default: '',
  },
  fallbackText: {
    type: String,
    default: '',
  },
  fallbackIcon: {
    type: String,
    default: '',
  },
  fallbackRender: {
    type: Function,
    default: undefined,
  },
}

export const useFallback = (props: ExtractPropTypes<typeof useFallbackProps>): Component => {
  return {
    name: 'VaFallback',

    setup () {
      if (props.fallbackIcon) {
        return () => h(VaIcon, {
          name: props.fallbackIcon,
        })
      }

      if (props.fallbackSrc) {
        return () => h('img', {
          src: props.fallbackSrc,
        })
      }

      if (props.fallbackRender) {
        return () => h(props.fallbackRender?.())
      }

      return () => h('span', props.fallbackText)
    },
  }
}
