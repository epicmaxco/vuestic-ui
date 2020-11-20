<template>
  <div
    class="va-test"
    :style="{ color }"
  >
    <slot>{{ label }}</slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import withConfigTransport from '../../../services/config-transport/withConfigTransport'

const propOptions = {
  color: { type: String, default: 'red' },
  label: { type: String, default: '' },
}

@Component({
  name: 'VaConfigTest',
  props: propOptions,
})
export default class VaConfigTest extends Vue {

}

export const WithConfig = withConfigTransport(VaConfigTest)
</script>

<style lang="scss">
.va-config-test {
}
</style>
