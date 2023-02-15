<template>
  <div class="flex flex-col gap-3">
    <div>0.1</div>
    <va-progress-circle
      :thickness="0.1"
      :model-value="value"
    />

    <div>0.6</div>
    <va-progress-circle
      :thickness="0.6"
      :model-value="value"
    />

    <div>0.6 + intermediate</div>
    <va-progress-circle
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
