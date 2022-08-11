<template>
  <va-file-upload
    v-model="basic"
    type="single"
    disabled
  />
  <va-divider horizontal />
  <va-file-upload
    v-model="basic"
    type="list"
    disabled
  />
  <va-divider horizontal />
  <va-file-upload
    v-model="basic"
    type="gallery"
    disabled
  />
</template>

<script>
export default {
  data () {
    return {
      basic: [
        { name: 'Example', url: 'https://via.placeholder.com/100' },
      ],
    }
  },
}
</script>
