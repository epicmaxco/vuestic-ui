<template>
  <div>
    <va-switch v-model="value" disabled class="mr-4" />
    <va-switch v-model="value" readonly class="mr-4" />
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
