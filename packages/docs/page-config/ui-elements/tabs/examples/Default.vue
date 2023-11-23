<template>
  <VaTabs v-model="value">
    <template #tabs>
      <VaTab
        v-for="tab in ['One', 'Two', 'Three']"
        :key="tab"
      >
        {{ tab }}
      </VaTab>
    </template>
  </VaTabs>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
    };
  },
};
</script>
