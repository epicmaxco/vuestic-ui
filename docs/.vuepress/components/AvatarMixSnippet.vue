<template>
  <div>
    <va-avatar color="primary" text-color="white">S</va-avatar>
    <va-avatar color="secondary" icon="invert_colors"/>
    <va-avatar color="secondary" size="large" font-size="24px">A</va-avatar>
    <va-avatar src="https://randomuser.me/api/portraits/women/5.jpg" />
    <va-avatar color="danger" icon="info" square/>
  </div>
</template>

<script>
import VaAvatar
  from '../../../src/components/vuestic-components/va-avatar/VaAvatar'

export default {
  name: 'AvatarSizeSnippet',
  components: { VaAvatar },
}
</script>
