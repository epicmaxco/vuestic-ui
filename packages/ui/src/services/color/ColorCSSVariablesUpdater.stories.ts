import { VaChip, VaButton } from '../../components'
import { useColors } from '../../composables'

export default {
  title: 'services/ColorCSSVariablesUpdater',
}

export const Default = () => ({
  components: { VaChip, VaButton },
  setup () {
    const colors = useColors()
    const change = (color: string) => {
      colors.setColors({ danger: color })
    }

    return {
      change,
    }
  },
  template: `
    <div class="mb-6">
      <a style="color: var(--va-danger)">
        Danger color text
      </a>
    </div>

    Change danger color to:
    <va-button @click="change('#4ab2e3')" color="#4ab2e3">
      blue (#4ab2e3)
    </va-button>
    <va-button @click="change('#e34b4a')" color="#e34b4a">
      red (#e34b4a)
    </va-button>
  `,
})
