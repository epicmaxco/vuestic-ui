<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <va-button outline>some</va-button>
    <va-chip color="secondary">vuestic</va-chip>
    <va-chip>vuestic</va-chip>
  </div>
</template>

<script>
import { useGlobalConfig, useTheme } from 'vuestic-ui'
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  setup () {
    const { setGlobalConfig } = useGlobalConfig()
    const { setTheme } = useTheme()

    setTheme({
      primary: '#000fa0',
      secondary: '#fa0000'
    })

    setGlobalConfig(config => ({
      ...config,
      VaChip: {
        color: 'primary'
      }
    }))
  }
}
</script>
