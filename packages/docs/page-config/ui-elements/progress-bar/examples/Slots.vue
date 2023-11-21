<template>
  <div class="flex flex-col gap-2">
    <div>When you use a default slot:</div>
    <VaProgressBar :model-value="value">
      {{ value }}
    </VaProgressBar>

    <div>
      When you use a 'content-inside' prop:
    </div>
    <VaProgressBar
      :model-value="value"
      size="large"
      content-inside
    >
      {{ value }}
    </VaProgressBar>

    <div>
      When you use a 'show-percent' prop:
    </div>
    <VaProgressBar
      :model-value="value"
      show-percent
    />
    <VaProgressBar
      :model-value="value"
      size="1.5rem"
      color="warning"
      content-inside
      show-percent
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 75,
    };
  },
};
</script>
