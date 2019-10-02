<template>
  <VbDemo>
    <VbCard title="default avatars sizes">
        <va-avatar></va-avatar>
        <va-avatar>ONE</va-avatar>
        <va-avatar>
          <div>DOM</div>
        </va-avatar>
    </VbCard>
    <VbCard title="Circle avatars sizes">
        <va-avatar size="small" color="info">S</va-avatar>
        <va-avatar size="medium" color="warning">M</va-avatar>
        <va-avatar size="large" color="danger">L</va-avatar>
    </VbCard>
    <VbCard title="Image avatars sizes">
        <va-avatar size="small" src="https://randomuser.me/api/portraits/women/5.jpg"></va-avatar>
        <va-avatar  src="https://randomuser.me/api/portraits/women/5.jpg"></va-avatar>
        <va-avatar size="large" src="https://randomuser.me/api/portraits/women/5.jpg"></va-avatar>
    </VbCard>
    <VbCard title="Icon avatars sizes">
        <va-avatar square size="small" color="danger" icon="iconicstroke iconicstroke-info"></va-avatar>
        <va-avatar square size="medium" color="warning" icon="iconicstroke iconicstroke-info"></va-avatar>
        <va-avatar square size="large" color="info" icon="iconicstroke iconicstroke-info"></va-avatar>
    </VbCard>
    <VbCard title="Custom String avatars sizes">
        <va-avatar size="44px" color="danger" icon="iconicstroke iconicstroke-info"></va-avatar>
        <va-avatar size="55px" color="warning" icon="iconicstroke iconicstroke-info"></va-avatar>
        <va-avatar size="66px" color="info" icon="iconicstroke iconicstroke-info"></va-avatar>
    </VbCard>
    <VbCard title="Custom Number avatars sizes">
        <va-avatar :size="44" color="danger" icon="iconicstroke iconicstroke-info"></va-avatar>
        <va-avatar :size="55" color="warning" icon="iconicstroke iconicstroke-info"></va-avatar>
        <va-avatar :size="66" color="info" icon="iconicstroke iconicstroke-info"></va-avatar>
    </VbCard>
  </VbDemo>
</template>

<script>

import VaAvatar from './VaAvatar'

export default {
  components: {
    VaAvatar,
  },
}
</script>
