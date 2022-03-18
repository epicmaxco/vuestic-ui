<template>
  <div class="va-tree-root">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref, nextTick } from 'vue'
import { TreeViewKey } from './types'
import { useColor } from '../../composables/useColor'
import VaTreeCategory from './VaTreeCategory/VaTreeCategory.vue'

const categories = ref<typeof VaTreeCategory[]>([])

export default defineComponent({
  name: 'VaTreeView',
  props: {
    color: {
      type: String,
      default: '',
    },
  },
  setup: (props) => {
    const onChildMounted = (category: typeof VaTreeCategory) => {
      categories.value.push(category)
    }

    const onChildUnmounted = (removableCategory: typeof VaTreeCategory) => {
      categories.value = categories.value.filter((category: typeof VaTreeCategory) => category !== removableCategory)
    }

    const treeRoot = {
      color: props.color,
      onChildMounted,
      onChildUnmounted,
    }

    provide(TreeViewKey, treeRoot)

    return {
      categories,
      ...useColor(props),
    }
  },
  methods: {
    collapse () {
      nextTick(() => {
        categories.value.forEach((child: typeof VaTreeCategory) => {
          child.collapse()
        })
      })
    },

    expand () {
      nextTick(() => {
        categories.value.forEach((child: typeof VaTreeCategory) => {
          child.expand()
        })
      })
    },
  },
})
</script>

<style lang="scss">
@import 'variables';

.va-tree-root {
  padding: var(--va-tree-root-padding);
  font-family: var(--va-font-family);
}
</style>
