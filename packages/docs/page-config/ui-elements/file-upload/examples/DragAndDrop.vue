<template>
  <VaFileUpload
    v-model="basic"
    dropzone
  />
</template>

<script>
export default {
  data() {
    return {
      basic: [],
    };
  },
};
</script>
