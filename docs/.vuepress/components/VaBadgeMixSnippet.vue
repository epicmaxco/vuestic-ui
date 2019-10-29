<template>
  <div class="example" :key="count">
    <va-badge />
    &nbsp;
    <va-badge color="warning">
      <template v-slot:badge>
        <va-icon name="warning" />
      </template>
    </va-badge>
    &nbsp;
    <va-badge color="primary" label="NEW" overlap transparent>
      <b>VUESCIT UI</b>
    </va-badge>

    <button @click="changeTheme">Change theme</button>
  </div>
</template>

<script>
import { overrideContextConfig, ContextPluginMixin } from '../../../src/components/context-test/context-provide/ContextPlugin'
import VaBadge from '../../../src/components/vuestic-components/va-badge/VaBadge'
import VaIcon from '../../../src/components/vuestic-components/va-icon/VaIcon'

export default {
  mixins: [ContextPluginMixin],
  components: {
    VaBadge,
    VaIcon,
  },
  data () {
    return {
      count: 0
    }
  },
  methods: {
    changeTheme () {
      overrideContextConfig(this, { VaBadge: { color: 'info', textColor: '#000', label: 'NEW' } })

      this.count = this.count + 1
    },
  },
}
</script>
