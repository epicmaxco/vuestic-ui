<template>
  <va-slider v-model="value1" icon-append="home" />
  <va-slider v-model="value2" icon-prepend="home" />
</template>

<script>
export default {
  data() {
    return {
      value1: 45,
      value2: 45,
    };
  },
};
</script>
