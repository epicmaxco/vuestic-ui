<template>
  <va-switch v-model="value" color="success" class="mr-6" />
  <va-switch v-model="value" color="info" class="mr-6" />
  <va-switch v-model="value" color="danger" class="mr-6" />
  <va-switch v-model="value" color="warning" class="mr-6" />
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
