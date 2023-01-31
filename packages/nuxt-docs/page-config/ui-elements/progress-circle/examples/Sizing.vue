<template>
  <div class="flex flex-col gap-3">
    <div>small</div>
    <va-progress-circle size="small" :modelValue="value" />

    <div>large</div>
    <va-progress-circle size="large" :modelValue="value" />

    <div>25px</div>
    <va-progress-circle :size="25" :modelValue="value" />

    <div>2rem</div>
    <va-progress-circle size="2rem" :modelValue="value" />
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
