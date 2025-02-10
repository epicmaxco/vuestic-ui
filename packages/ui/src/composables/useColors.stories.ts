import { defineStory } from '../../.storybook/types'
import { useColors } from './useColors'

export default {
  title: 'composables/useColors',
}

export const Colors = defineStory({
  story: () => ({
    setup () {
      const { colors, getTextColor, getColor } = useColors()

      return {
        colors,
        getColor,
        getTextColor,
      }
    },

    template: `
    <div class="flex flex-wrap gap-2">
      <div v-for="color, colorName in colors" :style="{ backgroundColor: color, color: getColor(getTextColor(color)) }" class="p-4">
        {{ colorName }}: {{ color }}
      </div>
    </div>
    `,
  }),
})
