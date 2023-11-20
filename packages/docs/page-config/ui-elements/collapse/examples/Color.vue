<template>
  <div class="flex flex-col gap-4 min-w-96">
    <VaCollapse
      v-model="value[0]"
      header="Color collapse header only"
      solid
      color="success"
    >
      Collapse content
    </VaCollapse>
    <VaCollapse
      v-model="value[1]"
      header="Color collapse header and body"
      color="#3D9209"
      color-all
      icon="info"
    >
      Collapse content
    </VaCollapse>
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
