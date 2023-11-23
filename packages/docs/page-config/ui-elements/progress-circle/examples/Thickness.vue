<template>
  <div class="flex flex-col gap-3">
    <div>0.1</div>
    <VaProgressCircle
      :thickness="0.1"
      :model-value="value"
    />

    <div>0.6</div>
    <VaProgressCircle
      :thickness="0.6"
      :model-value="value"
    />

    <div>0.6 + intermediate</div>
    <VaProgressCircle
      :thickness="0.6"
      indeterminate
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 35,
    };
  },
};
</script>
