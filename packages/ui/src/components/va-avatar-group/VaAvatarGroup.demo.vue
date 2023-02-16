<template>
  <VbDemo>
    <VbCard title="Default">
      <va-avatar-group :options="avatars" :max="3" class="mb-6" />
      <va-avatar-group :options="avatars" :max="3" square />
    </VbCard>
    <VbCard title="Vertical">
      <div class="d-flex">
        <va-avatar-group :options="avatars" :max="3" vertical class="mr-6" />
        <va-avatar-group :options="avatars" :max="3" vertical square class="mr-6" />
      </div>
    </VbCard>
  </VbDemo>
</template>

<script lang="ts" setup>
import VaAvatarGroup from './VaAvatarGroup.vue'

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
