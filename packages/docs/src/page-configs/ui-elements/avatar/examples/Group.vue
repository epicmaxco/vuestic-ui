<template>
  <va-avatar-group :options="avatars" :max="3" />
</template>

<script>
export default {
  name: 'Group',
  data: () => ({
    avatars: [
      { src: 'https://randomuser.me/api/portraits/women/1.jpg' },
      { src: 'https://randomuser.me/api/portraits/women/2.jpg' },
      { src: 'https://randomuser.me/api/portraits/women/3.jpg' },
      { src: 'https://randomuser.me/api/portraits/women/4.jpg' },
      { src: 'https://randomuser.me/api/portraits/women/5.jpg' },
    ],
  }),
}
</script>
