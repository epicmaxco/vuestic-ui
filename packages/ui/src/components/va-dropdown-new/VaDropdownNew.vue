<template>
  <div
    ref="anchor"
  >
    <slot
      name="anchor"
    >
    </slot>
  </div>
  <div
    v-if="isMounted"
    ref="floating"
    :style="floatingStyles"
  >
    <slot
    ></slot>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType, computed, watch, nextTick } from 'vue'
import { useFloating, autoUpdate, flip } from '@floating-ui/vue'
import { MaybeHTMLElementOrSelector, useHTMLElementSelector, useIsMounted } from '../../composables'

export default defineComponent({
  name: 'VaDropdownNew',
  props: {
    trigger: {
      type: String as PropType<'click' | 'right-click' | 'hover' | 'dblclick' | 'none'>,
      default: 'click',
      validator: (value: string) => ['click', 'right-click', 'hover', 'dblclick', 'none'].includes(value),
    },
    target: { type: [String, Object] as PropType<MaybeHTMLElementOrSelector>, default: undefined },
  },
  setup (props) {
    const anchor = ref(null)
    const floating = ref(null)

    const targetElement = useHTMLElementSelector(computed(() => props.target || 'body'))
    console.log(targetElement.value)

    const { floatingStyles, update } = useFloating(anchor, floating, {
      whileElementsMounted: autoUpdate,
      middleware: computed(() => [
        flip({
          boundary: targetElement.value,
        }),
      ]),
    })

    const isMounted = useIsMounted()

    return {
      anchor,
      floating,
      floatingStyles,
      isMounted,
    }
  },
})
</script>
