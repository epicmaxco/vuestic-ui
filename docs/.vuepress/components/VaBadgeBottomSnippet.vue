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
    <va-badge bottom>
      <template v-slot:badge>
        NEW
      </template>
      BOTTOM
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
