import { VaChip, VaButton } from '../../components'
import { useColors } from '../../composables'

export default {
  title: 'services/ColorCSSVariablesUpdater',
}

export const Default = () => ({
  components: { VaChip, VaButton },
  setup () {
    const colors = useColors()
    const change = (color) => {
      colors.setColors({ danger: color })
    }

    return {
      change,
    }
  },
  template: `
    <div class="mb-6">
      <a style="color: var(--va-danger)">
        This is title danger color
      </a>
      <va-chip color="danger">This is vue component</va-chip>
    </div>

    Change danger color to:
    <va-button @click="change('#4ab2e3')" color="#4ab2e3">
      danger = blue
    </va-button>
    <va-button @click="change('#e34b4a')" color="#e34b4a">
      danger = red
    </va-button>
  `,
})
