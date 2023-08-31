<template>
  <div class="w-96">
    <va-collapse
      v-model="value[0]"
      header="Color collapse header only"
      solid
      color="success"
      class="mb-6"
    >
      <div class="p-2">
        Collapse content
      </div>
    </va-collapse>
    <va-collapse
      v-model="value[1]"
      header="Color collapse header and body"
      color="#000"
      color-all
      text-color="#fff"
      icon="info"
      class="mb-6"
    >
      <div class="p-2">
        Collapse content
      </div>
    </va-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: [false, false],
    };
  },
};
</script>
