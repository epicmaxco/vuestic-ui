<template>
  <VaFileUpload
    v-model="basic"
    type="single"
    disabled
  />
  <VaDivider horizontal />
  <VaFileUpload
    v-model="basic"
    type="list"
    disabled
  />
  <VaDivider horizontal />
  <VaFileUpload
    v-model="basic"
    type="gallery"
    disabled
  />
</template>

<script>
export default {
  data() {
    return {
      basic: [{ name: "Example", url: "https://via.placeholder.com/100" }],
    };
  },
};
</script>
