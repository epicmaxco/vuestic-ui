<template>
  <div class="example">
    <va-badge label="badge" />

    <va-badge color="secondary" >
      <template #text>
        <va-icon name="warning" />
      </template>
    </va-badge>

    <va-badge color="success">
      <template #text>
        <va-icon name="info" />
      </template>
      Floated
    </va-badge>

    <va-badge color="warning" label="NEW" dot overlap>
      <va-icon name="account_box" size="30px" />
    </va-badge>

    <va-badge color="info" label="NEW" transparent bottom overlap>
      <va-icon name="face" size="30px" />
    </va-badge>
  </div>
</template>

<script>
import { ContextPluginMixin } from '../../../ui/src/components/context-test/context-provide/ContextPlugin'
import VaBadge from '../../../ui/src/components/vuestic-components/va-badge/VaBadge'
import VaIcon from '../../../ui/src/components/vuestic-components/va-icon/VaIcon'

export default {
  mixins: [ContextPluginMixin],
  components: {
    VaBadge,
    VaIcon,
  },
}
</script>
