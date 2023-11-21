<template>
  <div class="flex flex-col gap-3">
    <div>small</div>
    <VaProgressCircle
      size="small"
      :model-value="value"
    />

    <div>large</div>
    <VaProgressCircle
      size="large"
      :model-value="value"
    />

    <div>25px</div>
    <VaProgressCircle
      :size="25"
      :model-value="value"
    />

    <div>2rem</div>
    <VaProgressCircle
      size="2rem"
      :model-value="value"
    />
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
