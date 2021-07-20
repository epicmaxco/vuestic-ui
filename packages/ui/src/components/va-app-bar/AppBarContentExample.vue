<template>
  <va-button icon="home" :color="color" flat :rounded="false" />
  <va-button icon="info" :color="color" flat :rounded="false" />
  <va-button icon="battery" :color="color" flat :rounded="false" />
  <va-spacer />
  <va-button :color="color" flat :rounded="false">
    Login
  </va-button>
  <va-button-dropdown :color="color" size="small" icon="ellipsis">
    Content
  </va-button-dropdown>
</template>

<script>
import VaButton from '../va-button/VaButton'
import VaSpacer from '../va-spacer/VaSpacer'
import VaButtonDropdown from '../va-button-dropdown/VaButtonDropdown'

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
