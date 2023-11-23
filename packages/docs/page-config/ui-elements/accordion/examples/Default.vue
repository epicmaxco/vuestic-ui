<template>
  <VaAccordion
    v-model="value"
    class="max-w-sm"
  >
    <VaCollapse
      v-for="(collapse, index) in collapses"
      :key="index"
      :header="collapse.title"
    >
      <template #content>
        {{ collapse.content }}
      </template>
    </VaCollapse>
  </VaAccordion>
</template>

<script>
export default {
  data() {
    return {
      value: [false, false, false],
      collapses: [
        { title: "First collapse", content: "First collapse content" },
        { title: "Second collapse", content: "Second collapse content" },
        { title: "Third collapse", content: "Third collapse content" },
      ],
    };
  },
};
</script>
