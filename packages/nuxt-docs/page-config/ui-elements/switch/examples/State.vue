<template>
  <div class="flex items-center">
    <va-switch
      v-model="value"
      :disabled="isState"
      class="mr-6"
    />
    <va-switch
      v-model="value"
      :readonly="isState"
      class="mr-6"
    />
    <va-checkbox
      v-model="isState"
      label="States enabled"
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
