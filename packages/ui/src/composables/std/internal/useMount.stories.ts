import { defineComponent, h } from 'vue'
import { defineStory } from '../../../../.storybook/types'
import { useMount } from './useMount'

export default {
  title: 'composables/useMount',
}

const comp = defineComponent({
  template: '<div class="fixed bg-red-100">Test</div>',
})

export const Default = defineStory({
  story: () => ({
    setup () {
      const { createInstance } = useMount(comp)

      return {
        createInstance,
      }
    },

    template: `
      <div @click="createInstance">Create</div>
    `,
  }),
})
