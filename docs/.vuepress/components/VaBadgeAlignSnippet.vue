<template>
  <div>
    <va-badge left overlap>
      <template v-slot:badge>
        <va-icon name="warning" size="12px"/>
      </template>
      <va-icon name="account_box" size="50px" />
    </va-badge>
    &nbsp;
    &nbsp;
    <va-badge bottom overlap>
      <template v-slot:badge>
        <va-icon name="warning" size="12px" />
      </template>
      <va-icon name="account_box" size="50px" />
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
