<template>
  <div class="example">
    <va-badge transparent label="NEW">
      Text
    </va-badge>
    &nbsp;
    &nbsp;
    &nbsp;
    <va-badge overlap transparent label="+1">
      <va-icon name="face" size="30px" />
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
