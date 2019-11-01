<template>
  <div class="example">
    <va-badge label="default" />
    <va-badge label="secondary" color="secondary" />
    <va-badge label="aqua" color="aqua"/>
    <va-badge label="#ad0" color="#ad0" />
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
