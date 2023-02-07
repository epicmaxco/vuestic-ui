<template>
  <div style="width: 300px">
    <va-input class="mb-6" v-model="value" />
    <va-input class="mb-6" v-model="value" placeholder="Placeholder" />
    <va-input class="mb-6" v-model="value" label="Name" placeholder="Label" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
};
</script>
