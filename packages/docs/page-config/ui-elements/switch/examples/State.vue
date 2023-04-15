<template>
  <va-checkbox
    v-model="isState"
    label="States enabled"
    class="mb-4"
  />

  <div class="flex gap-8 flex-wrap">
    <va-switch
      v-model="value"
      :disabled="isState"
    />
    <va-switch
      v-model="value"
      :readonly="isState"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: true,
      isState: true,
    };
  },
};
</script>
