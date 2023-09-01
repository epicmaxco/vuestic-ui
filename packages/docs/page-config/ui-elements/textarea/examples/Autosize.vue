<template>
  <va-textarea
    v-model="value"
    autosize
    max-rows="5"
    placeholder="Start typing"
  />
</template>

<script>
export default {
  data() {
    return {
      value: '',
    };
  },
};
</script>
