<template>
  <VaTabs
    v-model="value"
    vertical
  >
    <template #tabs>
      <VaTab
        v-for="title in ['One', 'Two', 'Three']"
        :key="title"
        :name="title"
      >
        {{ title }}
      </VaTab>
    </template>
  </VaTabs>
</template>

<script>
export default {
  data() {
    return {
      value: "One",
    };
  },
};
</script>
