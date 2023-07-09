<template>
  <div class="w-96">
    <va-collapse
      v-model="value[0]"
      header="Collapse header"
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
      header="Collapse header"
      solid
      color="secondary"
      class="mb-6"
    >
      <div class="p-2">
        Collapse content
      </div>
    </va-collapse>
    <va-collapse
      v-model="value[2]"
      header="Collapse header"
      solid
      color="info"
      color-all
      class="mb-6"
    >
      <div class="p-2">
        Collapse content
      </div>
    </va-collapse>
    <va-collapse
      v-model="value[3]"
      header="Collapse header"
      solid
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
      value: [false, false, false, false],
    };
  },
};
</script>
