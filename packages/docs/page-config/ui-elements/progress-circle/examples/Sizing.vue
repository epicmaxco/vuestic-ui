<template>
  <div class="flex flex-col gap-3">
    <div>small</div>
    <va-progress-circle
      size="small"
      :model-value="value"
    />

    <div>large</div>
    <va-progress-circle
      size="large"
      :model-value="value"
    />

    <div>25px</div>
    <va-progress-circle
      :size="25"
      :model-value="value"
    />

    <div>2rem</div>
    <va-progress-circle
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
