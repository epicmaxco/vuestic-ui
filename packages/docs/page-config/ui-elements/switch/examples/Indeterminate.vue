<template>
  <div class="flex gap-8 flex-wrap">
    <va-switch
      v-model="value"
      indeterminate
      :label="String(value)"
    />
    <va-switch
      v-model="value2"
      indeterminate
      indeterminate-value="middle"
      :label="String(value2)"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: true,
      value2: true,
    };
  },
};
</script>
