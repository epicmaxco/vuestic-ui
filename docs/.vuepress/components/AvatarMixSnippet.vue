<template>
  <div>
    <va-avatar color="primary" text-color="white">S</va-avatar>
    <va-avatar color="secondary" icon="iconicstroke iconicstroke-info"/>
    <va-avatar color="secondary" size="large" font-size="24px"/>
    <va-avatar src="https://randomuser.me/api/portraits/women/5.jpg" />
    <va-avatar color="danger" icon="3d_rotation" square/>
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
