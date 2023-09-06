<template>
  <va-accordion
    v-model="value"
    class="max-w-sm"
    multiple
  >
    <va-collapse
      v-for="(collapse, index) in collapses"
      :key="index"
      :header="collapse.title"
    >
      <template #content>
        {{ collapse.content }}
      </template>
    </va-collapse>
  </va-accordion>
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
