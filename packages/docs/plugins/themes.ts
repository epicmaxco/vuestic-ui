
import { COLOR_THEMES, ThemeName } from '../theme-config'

function extend (app, mixin) {
  if (!app.mixins) {
    app.mixins = []
  }
  app.mixins.push(mixin)
}

export default async function ({ app }) {
  extend(app, {
    created () {
      this.$root.$on('changeTheme', this.setTheme)
    },
    mounted () {
      const currentTheme = localStorage.getItem('currentTheme')
      // @ts-ignore
      const theme = Object.values(ThemeName).includes(currentTheme) ? currentTheme : ThemeName.DEFAULT
      this.$root.$emit('changeTheme', theme)
    },
    beforeDestroy () {
      this.$root.$off('changeTheme', this.setTheme)
    },
    methods: {
      setTheme (themeName) {
        Object.assign(
          this.$themes,
          COLOR_THEMES[themeName] || COLOR_THEMES[ThemeName.DEFAULT],
        )
      },
    },
  })
}
