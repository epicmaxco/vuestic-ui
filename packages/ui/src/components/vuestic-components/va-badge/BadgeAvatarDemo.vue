<template>
  <VbCard title="With Avatar">
    <va-badge
      class="item"
      label="3"
      overlap
    >
      <va-avatar src="https://randomuser.me/api/portraits/women/5.jpg" />
    </va-badge>
    <va-badge
      class="item"
      dot
      label="3"
    >
      <va-avatar src="https://randomuser.me/api/portraits/women/5.jpg" />
    </va-badge>
    <va-badge
      class="item"
      dot
      label="3"
      overlap
    >
      <va-avatar src="https://randomuser.me/api/portraits/women/5.jpg" />
    </va-badge>
    <va-badge
      class="item"
      dot
    >
      <va-avatar
        square
        src="https://randomuser.me/api/portraits/women/8.jpg"
      />
    </va-badge>
    <va-badge
      class="item"
      dot
      overlap
    >
      <va-avatar
        square
        src="https://randomuser.me/api/portraits/women/8.jpg"
      />
    </va-badge>
  </VbCard>
</template>

<script>
import VaAvatar from '../va-avatar'
import VaBadge from './index'

export default {
  name: 'badge-avatar-demo',
  components: { VaBadge, VaAvatar },
}
</script>

<style lang="scss" scoped>
.item {
  margin-right: 1rem;
  margin-bottom: 1rem;
}
</style>
