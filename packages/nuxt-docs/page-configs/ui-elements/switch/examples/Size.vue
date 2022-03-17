<template>
  <div>
    <va-switch v-model="value" label="small" size="small" class="mr-4" />
    <va-switch v-model="value" label="default" class="mr-4" />
    <va-switch v-model="value" label="large" size="large" class="mr-4" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: true,
    };
  },
};
</script>
