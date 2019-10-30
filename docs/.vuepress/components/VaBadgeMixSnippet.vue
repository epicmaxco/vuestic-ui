<template>
  <div class="example">
    <va-badge label="badge" />

    <va-badge color="warning" transparent>
      <template v-slot:badge>
        <va-icon name="warning" />
      </template>
    </va-badge>

    <va-badge color="success" label="NEW" dot overlap>
      <b>VUESCIT UI</b>
    </va-badge>
  </div>
</template>

<script>
import { ContextPluginMixin } from '../../../src/components/context-test/context-provide/ContextPlugin'
import VaBadge from '../../../src/components/vuestic-components/va-badge/VaBadge'
import VaIcon from '../../../src/components/vuestic-components/va-icon/VaIcon'

export default {
  mixins: [ContextPluginMixin],
  components: {
    VaBadge,
    VaIcon,
  },
}
</script>
