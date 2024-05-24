import { defineComponent } from 'vue'
import { defineStory } from '../../../.storybook/types'
import VaStickyScrollbar from './StickyScrollbar.vue'

export default {
  title: 'VaStickyScrollbar',
  component: VaStickyScrollbar,
}

export const Horizontal = defineStory({
  story: () => ({
    components: { VaStickyScrollbar },

    template: `
      <div style="width: 200px; height: 200vh; overflow: auto; position: relative;">
        <div style="width: 300px; height: 300vh; background: linear-gradient(45deg, #fff, #000);" />
        <VaStickyScrollbar direction="horizontal" />
      </div>
    `,
  }),
})

export const Vertical = defineStory({
  story: () => ({
    components: { VaStickyScrollbar },

    template: `
      <div style="width: 200vh; height: 200px; overflow: auto; position: relative;">
        <div style="width: 300vh; height: 300px; background: linear-gradient(45deg, #fff, #000);" />
        <VaStickyScrollbar direction="vertical" />
      </div>
    `,
  }),
})
