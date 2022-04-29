import { computed } from 'vue'
import { useColors } from '../../../composables/useColor'

export const useCarouselColor = () => {
  const { setHSLAColor, getColor } = useColors()

  return {
    computedColor: computed(() => setHSLAColor(getColor('dark'), { a: 0.7 })),
    computedHoverColor: computed(() => setHSLAColor(getColor('primary'), { a: 0.7 })),
    computedActiveColor: computed(() => getColor('primary')),
  }
}
