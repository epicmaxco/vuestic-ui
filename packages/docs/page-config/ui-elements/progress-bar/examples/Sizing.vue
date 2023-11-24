<template>
  <div class="flex flex-col gap-3">
    <div>small</div>
    <VaProgressBar
      size="small"
      :model-value="value"
    />
    <div>large</div>
    <VaProgressBar
      size="large"
      :model-value="value"
    />
    <div>25px</div>
    <VaProgressBar
      :size="25"
      :model-value="value"
    />
    <div>2rem</div>
    <VaProgressBar
      size="2rem"
      :model-value="value"
    />
  </div>
</template>

<script>
export default {
  data() {
    return { value: 35 };
  },
};
</script>
