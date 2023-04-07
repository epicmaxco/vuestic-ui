<template>
  <div class="flex gap-8 flex-wrap">
    <va-switch
      v-model="value"
      label="left"
      left-label
    />
    <va-switch
      v-model="value"
      label="right"
    />
    <va-switch v-model="value">
      right labeled by slot
    </va-switch>
    <va-switch
      v-model="value"
      left-label
    >
      left labeled by slot
    </va-switch>
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
