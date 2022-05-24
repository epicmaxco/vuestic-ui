<template>
  <va-file-upload v-model="basic" type="gallery" file-types="image/*" />
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
