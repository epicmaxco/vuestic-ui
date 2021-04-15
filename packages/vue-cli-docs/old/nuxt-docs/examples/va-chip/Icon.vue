<template>
  <div>
      <va-chip
        v-for="(icon, index) in icons"
        :key="index"
        :icon="icon"
      >
        {{icon}}
      </va-chip>
  </div>
</template>

<script>
export default {
  data () {
    return {
      icons: [
        'face',
        'email',
        'thumb_up',
        'info',
        'remove',
      ],
    }
  },
}
</script>
