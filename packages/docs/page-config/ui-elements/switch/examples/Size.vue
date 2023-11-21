<template>
  <div class="flex gap-8 flex-wrap">
    <VaSwitch
      v-model="value"
      label="small"
      size="small"
    />
    <VaSwitch
      v-model="value"
      label="default"
    />
    <VaSwitch
      v-model="value"
      label="large"
      size="large"
    />
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
