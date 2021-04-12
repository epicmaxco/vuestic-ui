<template>
  <div class="example">
    <va-badge overlap dot>
      <template #text>
        <va-icon name="warning" size="12px" />
      </template>
      <va-icon name="account_box" size="30px" />
    </va-badge>
  </div>
</template>

<script>
import VaBadge from 'vuestic-ui/src/components/vuestic-components/va-badge/VaBadge'
import VaIcon from 'vuestic-ui/src/components/vuestic-components/va-icon/VaIcon'

export default {
  components: {
    VaBadge,
    VaIcon,
  },
}
</script>
