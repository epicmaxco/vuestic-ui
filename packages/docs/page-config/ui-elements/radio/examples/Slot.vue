<template>
  <va-radio
    v-model="value"
    :options="['One', 'Two', 'Three']"
    vertical
  >
    <template #icon="{ value }">
      <va-icon
        class="custom-icon"
        :name="value ? 'check_circle' : 'radio_button_unchecked'"
        :color="value ? 'primary': 'secondary'"
      />
    </template>

    <template #default="{ index, text }">
      <div class="flex items-center">
        <va-avatar class="mr-2" :src="`https://randomuser.me/api/portraits/men/${index}.jpg`" />
        {{ text }}
      </div>
    </template>
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
