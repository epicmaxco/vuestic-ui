<template>
  <va-button icon="home" :color="color" v-bind="VaButtonPresets.plain" />
  <va-button icon="info" :color="color" v-bind="VaButtonPresets.plain" />
  <va-button icon="battery" :color="color" v-bind="VaButtonPresets.plain" />
  <va-spacer />
  <va-button :color="color" v-bind="VaButtonPresets.plain">
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
import { VaButtonPresets } from '../va-button/VaButton'

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
  data: () => ({
    VaButtonPresets,
  }),
}
</script>
