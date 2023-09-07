<template>
  <va-collapse
    v-model="value"
    class="min-w-96"
    header="Collapse header"
    icon="home"
  >
    Collapse content
  </va-collapse>
</template>

<script>
export default {
  data() {
    return {
      value: false,
    };
  },
};
</script>
