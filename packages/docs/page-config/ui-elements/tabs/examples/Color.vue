<template>
  <div class="w-[280px]">
    <VaTabs
      v-model="value"
      color="danger"
    >
      <template #tabs>
        <VaTab
          v-for="tab in ['One', 'Two', 'Three']"
          :key="tab"
          :name="tab"
        >
          {{ tab }}
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

    <VaTabs
      v-model="value"
      class="mt-2"
      color="secondary"
    >
      <template #tabs>
        <VaTab color="success">
          First tab
        </VaTab>
        <VaTab color="warning">
          Second tab
        </VaTab>
        <VaTab color="danger">
          Third tab
        </VaTab>
        <VaTab color="#CCCCFF">
          Fourth tab
        </VaTab>
        <VaTab color="#5B2C6F">
          Fifth tab
        </VaTab>
      </template>
    </VaTabs>
  </div>
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
