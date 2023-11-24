<template>
  <div class="flex gap-8 flex-wrap">
    <VaSwitch
      v-model="value"
      label="left"
      left-label
    />
    <VaSwitch
      v-model="value"
      label="right"
    />
    <VaSwitch v-model="value">
      right labeled by slot
    </VaSwitch>
    <VaSwitch
      v-model="value"
      left-label
    >
      left labeled by slot
    </VaSwitch>
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
