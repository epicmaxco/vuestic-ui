<template>
  <va-collapse
    v-model="value"
    class="w-96"
    header="Collapse header"
    solid
  >
    <div>Collapse content</div>
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
