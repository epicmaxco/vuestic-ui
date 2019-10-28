<template>
  <div class="example">
    <va-badge label="badge" />
    &nbsp;
    <va-badge color="warning">
      <template v-slot:badge><va-icon name="warning" /></template>
    </va-badge>
    &nbsp;
    <va-badge color="primary" label="badge" overlap transparent>
      <template v-slot:badge>NEW</template>
      <b>VUESCIT UI</b>
    </va-badge>
  </div>
</template>

<script>
import VaBadge from '../../../src/components/vuestic-components/va-badge/VaBadge'
import VaIcon from '../../../src/components/vuestic-components/va-icon/VaIcon'

export default {
  components: {
    VaBadge,
    VaIcon,
  },
}
</script>
