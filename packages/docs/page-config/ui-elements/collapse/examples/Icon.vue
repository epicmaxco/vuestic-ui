<template>
  <va-collapse
    v-model="value"
    class="w-96"
    header="Collapse header"
    icon="home"
  >
    <template #content>
      Collapse content
    </template>
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
