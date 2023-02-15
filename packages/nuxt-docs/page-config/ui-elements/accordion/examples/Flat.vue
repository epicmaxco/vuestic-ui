<template>
  <va-accordion
    v-model="value"
    style="max-width: 400px"
  >
    <va-collapse
      v-for="(item, idx) in items"
      :key="idx"
      :header="item.title"
      text-color="textPrimary"
      color="textInverted"
      flat
    >
      <div style="padding: 0 1rem 0.75rem">
        {{ item.description }}
      </div>
    </va-collapse>
  </va-accordion>
</template>

<script>
const description = `
This section explains the behaviour of the component.
It can store huge amount of information that is hidden by default,
and revealed once clicked.`;

export default {
  data() {
    return {
      value: [false, true, false, false],
      items: [
        { title: "First section", description },
        { title: "Section A", description },
        { title: "Section B", description },
        { title: "Last section", description },
      ],
    };
  },
};
</script>

<style scoped>
.va-collapse + .va-collapse {
  border-top: 1px solid var(--va-background-element);
}
</style>
