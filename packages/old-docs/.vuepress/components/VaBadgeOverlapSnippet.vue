<template>
  <div class="example">
    <va-badge overlap dot>
      <va-icon name="face" size="30px" />
    </va-badge>

    <va-badge overlap label="+1">
      <va-icon name="face" size="30px" />
    </va-badge>

    <va-badge left bottom overlap>
      <template #text>
        <va-icon name="warning" size="12px" />
      </template>
      <va-icon name="account_box" size="30px" />
    </va-badge>
  </div>
</template>

<script>
import VaBadge from '../../../ui/src/components/vuestic-components/va-badge/VaBadge'
import VaIcon from '../../../ui/src/components/vuestic-components/va-icon/VaIcon'

export default {
  components: {
    VaBadge,
    VaIcon,
  },
}
</script>
