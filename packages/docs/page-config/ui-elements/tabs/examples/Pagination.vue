<template>
  <VaTabs
    v-model="value"
    class="w-[280px]"
  >
    <template #tabs>
      <VaTab
        v-for="title in ['One', 'Two', 'Three']"
        :key="title"
        :name="title"
      >
        {{ title }}
      </VaTab>
      <VaTab
        icon="home"
        label="Tab with icon"
        name="icon"
      />
      <VaTab
        icon="face"
        label="Disabled tab"
        disabled
        name="disabled"
      />
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
