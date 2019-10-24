<template>
  <div>
    <va-avatar square size="small" font-size="16px">S</va-avatar>
    <va-avatar square size="medium" font-size="22px">M</va-avatar>
    <va-avatar square size="large" font-size="32px">L</va-avatar>
    <va-avatar square size="small" src="https://randomuser.me/api/portraits/women/5.jpg" />
    <va-avatar square src="https://randomuser.me/api/portraits/women/5.jpg" />
    <va-avatar square size="large" src="https://randomuser.me/api/portraits/women/5.jpg" />
  </div>
</template>

<script>
import VaAvatar from '../../../src/components/vuestic-components/va-avatar/VaAvatar'

export default {
  components: { VaAvatar },
}
</script>
