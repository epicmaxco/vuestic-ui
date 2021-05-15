<template>
  <va-button icon="home" color="white" flat :rounded="false" />
  <va-button icon="info" color="white" flat :rounded="false" />
  <va-button icon="battery" color="white" flat :rounded="false" />
  <va-spacer />
  <va-button color="white" flat :rounded="false">
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
