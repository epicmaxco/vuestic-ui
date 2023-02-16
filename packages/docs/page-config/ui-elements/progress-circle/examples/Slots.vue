<template>
  <div class="flex flex-col gap-2">
    <va-progress-circle :model-value="value">
      {{ value + "%" }}
    </va-progress-circle>
    <va-progress-circle indeterminate>
      ...
    </va-progress-circle>
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
