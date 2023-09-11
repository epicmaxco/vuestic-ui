<template>
  <div class="flex flex-col gap-4 min-w-96">
    <va-collapse
      v-model="value[0]"
      header="Color collapse header only"
      solid
      color="success"
    >
      Collapse content
    </va-collapse>
    <va-collapse
      v-model="value[1]"
      header="Color collapse header and body"
      color="#3D9209"
      color-all
      icon="info"
    >
      Collapse content
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
