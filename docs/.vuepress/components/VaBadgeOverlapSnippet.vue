<template>
  <div class="example">
    <va-badge >
      <template v-slot:badge>
        NEW
      </template>
      DEFAULT
    </va-badge>
    &nbsp;
    &nbsp;
    &nbsp;
    <va-badge overlap>
      <template v-slot:badge>
        NEW
      </template>
      OVERLAP
    </va-badge>
    &nbsp;
    &nbsp;
    &nbsp;
    <va-badge overlap>
      <template v-slot:badge>
        +1
      </template>
      <va-icon name="face" size="30px" />
    </va-badge>
    &nbsp;
    &nbsp;
    &nbsp;
    <va-badge left bottom overlap>
      <template v-slot:badge>
        <va-icon name="warning" size="12px" />
      </template>
      <va-icon name="account_box" size="30px" />
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
