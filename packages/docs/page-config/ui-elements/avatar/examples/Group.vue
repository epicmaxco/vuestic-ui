<template>
  <va-avatar-group
    :options="avatars"
    :max="3"
  />
</template>

<script>
export default {
  name: "Group",
  data: () => ({
    avatars: [
      { src: "https://randomuser.me/api/portraits/women/1.jpg", alt: 'Women 1' },
      { src: "https://randomuser.me/api/portraits/women/2.jpg", alt: 'Women 2' },
      { src: "https://randomuser.me/api/portraits/women/3.jpg", alt: 'Women 3' },
      { src: "https://randomuser.me/api/portraits/women/4.jpg", alt: 'Women 4' },
      { src: "https://randomuser.me/api/portraits/women/5.jpg", alt: 'Women 5' },
    ],
  }),
};
</script>
