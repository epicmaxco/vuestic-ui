import { defineComponent } from 'vue'
import { defineStory } from '../../../.storybook/types'
import VaStickyScrollbar from './VaStickyScrollbar.vue'

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

/** Scrollbar reacts to content changes */
export const DynamicContent = defineStory({
  story: () => ({
    data () {
      return {
        showBlock2: false,
      }
    },

    mounted () {
      setInterval(() => {
        this.showBlock2 = !this.showBlock2
      }, 2000)
    },

    components: { VaStickyScrollbar },

    template: `
      <div style="width: 200vh; height: 200px; overflow: auto; position: relative;">
        <div v-if="showBlock2" style="width: 500vh; height: 300px; background: linear-gradient(45deg, #f0f, #0f0);" />
        <div v-else style="width: 300vh; height: 300px; background: linear-gradient(45deg, #fff, #000);" />
        <VaStickyScrollbar direction="vertical" />
      </div>
    `,
  }),
})
