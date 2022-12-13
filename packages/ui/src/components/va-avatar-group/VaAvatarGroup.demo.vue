<template>
  <VbDemo>
    <VbCard title="Default">
      <va-avatar-group :options="avatars" :max="3" />
    </VbCard>
    <VbCard title="Vertical">
      <va-avatar-group :options="avatars" :max="3" vertical />
    </VbCard>
  </VbDemo>
</template>

<script lang="ts" setup>
import VaAvatarGroup from '@/components/va-avatar-group/VaAvatarGroup.vue'

const avatars = [
  {
    src: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    icon: 'warning',
  },
  {
    src: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    icon: 'warning',
  },
  {
    src: 'https://randomuser.me/api/portraits/women/5.jpg',
  },
  {
    icon: 'warning',
  },
]
</script>
