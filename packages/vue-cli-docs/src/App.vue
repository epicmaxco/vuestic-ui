<template>
  <router-view />
</template>

<script>
import emitter from 'tiny-emitter/instance'
import { useColors } from '../../ui/src/main'
import { COLOR_THEMES, ThemeName } from './config/theme-config'

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
    const { setColors: setTheme } = useColors()
    setTheme(COLOR_THEMES[ThemeName.DEFAULT])
  },
}
</script>
