<template>
  <va-file-upload
    v-model="basic"
    dropzone
    file-types=".jpg,.png"
  />
</template>

<script>
export default {
  data () {
    return {
      basic: [],
    }
  },
}
</script>
