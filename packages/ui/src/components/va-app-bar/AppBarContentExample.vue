<template>
  <div class="app-bar-content-example">
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
  </div>
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

<style lang="scss">
@import "../../styles/resources";
@import "./_variables.scss";

.app-bar-content-example {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .va-button {
    @include keyboard-focus-outline($offset: -2px);
  }
}
</style>
