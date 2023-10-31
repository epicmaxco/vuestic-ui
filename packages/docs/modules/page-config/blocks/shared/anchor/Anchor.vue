<template>
  <NuxtLink
    :id="anchor"
    ref="el"
    :to="`#${anchor}`"
    :class="{ 'page-config-anchor--force-show': forceShow }"
    class="page-config-anchor va-link"
  >
    #
  </NuxtLink>
</template>

<script lang='ts'>
import { defineComponent, computed, onMounted, ComponentOptions } from 'vue'
import { kebabCase } from 'lodash'

export default defineComponent({
  props: {
    text: { type: String },
  },
  setup: (props) => {
    const el = ref<ComponentOptions>()
    const route = useRoute()

    const anchor = computed(() => kebabCase(props.text))

    const active = computed(() => {
      return route.hash === `#${anchor.value}`
    })

    onMounted(() => {
      if (active.value) {
        el.value?.$el.scrollIntoView()
      }
    })

    return {
      el,
      anchor,
      forceShow: active,
    }
  },
})
</script>

<style lang="scss" scoped>
.page-config-anchor {
  opacity: 0;
  font-size: 95%;
  transition: opacity 0.1s ease-in-out;

  &:focus {
    opacity: 1;
  }

  &--force-show {
    opacity: 1;
  }
}

*:hover > .page-config-anchor {
  opacity: 0.8;
}
</style>
