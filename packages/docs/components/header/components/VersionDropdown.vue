<template>
  <va-button-dropdown
    :button-props="{ flat: true }"
    color="primary"
    :label="version.value"
    class="version-dropdown"
  >
    <div
      v-for="(option, index) in version.options"
      :key="index"
      @click="selectOption(option)"
    >
      {{ option }}
    </div>
  </va-button-dropdown>
</template>

<script lang="ts">
// @ts-nocheck
import { Component, Vue } from 'vue-property-decorator'
import VaButtonDropdown from 'vuestic-ui/src/components/vuestic-components/va-button-dropdown/VaButtonDropdown.vue'

@Component({
  components: {
    VaButtonDropdown,
  },
})
export default class VersionDropdown extends Vue {
  data () {
    return {
      version: { options: ['v1.0'], value: 'v1.0' },
    }
  }

  selectOption (option: string) {
    this.version.value = option
  }
}
</script>

<style lang="scss">
  .version-dropdown .va-button__content {
    font-weight: bold;
  }
</style>
