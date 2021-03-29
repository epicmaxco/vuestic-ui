<template>
  <router-view />
</template>

<script>
import emitter from 'tiny-emitter/instance'
import { setupColors } from 'vuestic-ui'
import { COLOR_THEMES, ThemeName } from '@/theme-config'

const eventBus = {
  $on: (...args) => emitter.on(...args),
  $once: (...args) => emitter.once(...args),
  $off: (...args) => emitter.off(...args),
  $emit: (...args) => emitter.emit(...args),
}

export default {
  data () {
    return {
      eventBus,
    }
  },

  setup () {
    const { setTheme } = setupColors()
    setTheme(COLOR_THEMES[ThemeName.DEFAULT])
  },
}
</script>
