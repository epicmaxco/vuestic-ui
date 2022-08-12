<template>
  <va-button icon="home" :color="color" preset="plain" />
  <va-button icon="info" :color="color" preset="plain" />
  <va-button icon="battery" :color="color" preset="plain" />
  <va-spacer />
  <va-button :color="color" preset="plain">
    Login
  </va-button>
  <va-button-dropdown :color="color" size="small" icon="ellipsis">
    Content
  </va-button-dropdown>
</template>

<script>
import { VaButton } from '../va-button'
import VaSpacer from '../va-spacer/VaSpacer.vue'
import VaButtonDropdown from '../va-button-dropdown/VaButtonDropdown.vue'

export default {
  name: 'AppBarContentExample',
  components: {
    VaButton,
    VaSpacer,
    VaButtonDropdown,
  },
  props: {
    color: {
      type: String,
      default: undefined,
    },
  },
}
</script>
