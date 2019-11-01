<template>
  <div class="example">
    <va-badge label="NEW">
      DEFAULT
    </va-badge>

    <va-badge bottom label="NEW">
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
