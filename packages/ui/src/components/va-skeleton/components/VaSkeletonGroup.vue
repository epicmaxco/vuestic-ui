<template>
  <VaConfig :components="{ VaSkeleton: config }">
    <div class="va-skeleton-group" :class="bem" v-bind="$attrs">
      <slot />
    </div>
  </VaConfig>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, onMounted, onBeforeMount } from 'vue'
import { useBem } from '../../../composables'
import { VaConfig } from '../../va-config'

export default defineComponent({
  name: 'VaSkeletonGroup',

  components: {
    VaConfig,
  },

  props: {
    color: { type: String, default: 'backgroundElement' },
    delay: { type: Number, default: 100 },

    animation: { type: String as PropType<'pulse' | 'wave' | 'none'>, default: 'pulse' },

    lines: { type: Number, default: 1 },
    lineGap: { type: String, default: '8px' },
    lastLineWidth: { type: [String], default: '75%' },
  },

  setup (props) {
    const doShow = ref(false)

    let timeoutId: ReturnType<typeof setTimeout>

    onMounted(() => {
      // We can sync this way animations, wait until all blocks are rendered
      // This can be done with provide/inject to sync all animations, but for now we don't need it
      timeoutId = setTimeout(() => {
        doShow.value = true
      }, props.delay)
    })

    onBeforeMount(() => {
      clearTimeout(timeoutId)
    })

    const bem = useBem('va-skeleton-group', () => ({
      hidden: doShow.value === false,
    }))

    return {
      doShow,
      bem,
      config: computed(() => ({ ...props, delay: 0 })),
    }
  },
})
</script>

<style lang="scss" scoped>
.va-skeleton-group {
  position: relative;
  cursor: progress;

  &--hidden {
    display: none;
  }
}
</style>
