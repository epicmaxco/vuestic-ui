<template>
  <div class="flex flex-col gap-2">
    <VaProgressCircle :model-value="value">
      {{ value + "%" }}
    </VaProgressCircle>
    <VaProgressCircle indeterminate>
      ...
    </VaProgressCircle>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 65,
    };
  },
};
</script>
