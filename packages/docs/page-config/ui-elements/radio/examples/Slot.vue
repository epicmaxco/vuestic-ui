<template>
  <va-radio
    v-model="value"
    :options="['One', 'Two', 'Three']"
  >
    <template #icon="{ value }">
      <va-icon
        class="custom-icon"
        :name="value ? 'check_circle' : 'radio_button_unchecked'"
        :color="value ? 'primary': 'secondary'"
      />
    </template>
    <va-badge>Text</va-badge>
  </va-radio>
</template>

<script>
export default {
  data() {
    return {
      value: 'one',
    };
  },
};
</script>

<style lang="scss">
.va-radio__input:focus-visible + .custom-icon {
  outline: 1px solid var(--va-primary);
}
</style>