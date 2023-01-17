<script lang="ts">
import { defineComponent, h, onMounted, PropType } from 'vue'

import { VaIcon } from '../va-icon'

export default defineComponent({
  name: 'VaFallback',

  props: {
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
      type: Function as PropType<() => any | undefined>,
      default: undefined,
    },
  },

  components: { VaIcon },

  emits: ['fallback'],

  setup (props, { emit }) {
    onMounted(() => {
      emit('fallback')
    })

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
})
</script>
