<template>
  <!-- <metainfo /> -->
  <router-view />
</template>

<script>
import { defineComponent } from '@vue/runtime-core'
import emitter from 'tiny-emitter/instance'
import { useToast } from '../../ui/src/main'

const eventBus = {
  $on: (...args) => emitter.on(...args),
  $once: (...args) => emitter.once(...args),
  $off: (...args) => emitter.off(...args),
  $emit: (...args) => emitter.emit(...args),
}

export default defineComponent({
  name: 'App',

  data () {
    return {
      eventBus,
    }
  },

  setup () {
    const { init } = useToast()

    window.page_reload_notification = () => {
      init({
        message: 'New content is available. Page will be reloaded in 3 sec.',
        color: 'success',
        position: 'bottom-right',
        closeable: false,
        duration: 3000,
      })
    }
  },
})
</script>
