<template>
  <va-button icon="home" color="white" flat :round="false" />
  <va-button icon="info" color="white" flat :round="false" />
  <va-button icon="battery" color="white" flat :round="false" />
  <va-spacer />
  <va-button color="white" flat :round="false">
    Login
  </va-button>
  <va-button-dropdown size="small" icon="ellipsis">
    Content
  </va-button-dropdown>
</template>

<script>
import VaButton from '../va-button/VaButton'
import VaSpacer from '../va-spacer/VaSpacer'
import VaButtonDropdown from '../va-button-dropdown/VaButtonDropdown'

export default {

  name: 'AppBarTestContent',
  components: {
    VaButton,
    VaSpacer,
    VaButtonDropdown,
  },
}
</script>

