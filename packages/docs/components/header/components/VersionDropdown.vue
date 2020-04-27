<template>
  <va-button-dropdown
    :button-props="{ flat: true }"
    color="primary"
    :label="version.value"
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
import VaButtonDropdown from '../../../../ui/src/components/vuestic-components/va-button-dropdown/VaButtonDropdown.vue'

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

<style lang="scss" scoped>

@import "../../../../ui/src/components/vuestic-sass/resources/resources";
@import "../../../../ui/src/components/vuestic-sass/grid/grid-global-styles";
@import "../../../../ui/src/components/vuestic-sass/global/typography";
</style>
