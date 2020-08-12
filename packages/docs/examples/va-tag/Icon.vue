<template>
  <div>
      <va-tag
        v-for="(icon, index) in icons"
        :key="index"
        :icon="icon"
      >
        {{icon}}
      </va-tag>
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
