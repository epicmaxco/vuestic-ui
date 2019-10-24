<template>
  <div>
    <va-badge label="badge"></va-badge>
    ,
    <va-badge color="primary" overlap>
      <template v-slot:badge><va-icon size="14px">favorite</va-icon></template>
      Vuestic-ui
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
