<template>
  <va-collapse
    v-model="value"
    class="w-96"
    header="Collapse header"
    solid
  >
    <template #header="{ value, attrs, iconAttrs, text }">
      <div v-bind="attrs" class="w-full flex border-[var(--va-background-border)] border-2 p-2 bg-[var(--va-background-element)]">
        <va-icon
          name="va-arrow-down"
          :class="value ? '' : 'rotate-[-90deg]'"
          v-bind="iconAttrs"
        />

        <div class="ml-2">
          {{ text }}
        </div>
      </div>
    </template>

    <div class="p-2 border-[var(--va-background-border)] border-2 border-t-0">
      Lorem ipsum dolor sit amet, consectetur adipisci
    </div>
  </va-collapse>
</template>

<script>
export default {
  data() {
    return {
      value: false,
    };
  },
};
</script>
