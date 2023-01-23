<template>
  <a
    :id="anchor"
    :href="`#${anchor}`"
    class="page-config-anchor"
    :class="{ 'page-config-anchor--force-show': forceShow }"
  >#</a>
</template>

<script lang='ts'>
import { defineComponent, computed } from 'vue'
import { kebabCase } from 'lodash'

export default defineComponent({
  props: {
    text: { type: String },
  },
  setup: (props) => {
    const route = useRoute()

    const anchor = computed(() => kebabCase(props.text))

    return {
      anchor,
      forceShow: computed(() => {
        return route.hash === `#${anchor.value}`
      })
    }
  },
})
</script>

<style lang="scss" scoped>
  .page-config-anchor {
    opacity: 0;
    font-family: monospace !important;
    font-size: 95%;
    transition: opacity 0.1s ease-in-out;

    &--force-show {
      opacity: 1;
    }
  }

  *:hover > .page-config-anchor {
    opacity: 0.8;
  }
</style>
